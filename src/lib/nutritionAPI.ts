const API_FIELDS = 'product_name,brands,serving_size,nutriments';

export type FoodSearchResult = {
  id: string;
  name: string;
  serving: string;
  protein: number | null;
};

export function proteinStarRating(protein: number | null): number {
  if (protein === null) return 0;
  if (protein < 5) return 1;
  if (protein <= 10) return 3;
  if (protein <= 20) return 4;
  return 5;
}

export type BarcodeFoodResult = {
  name: string;
  serving: string;
  protein: number | null;
};

type UsdaFood = {
  fdcId: number;
  description: string;
  brandOwner?: string;
  servingSize?: number;
  servingSizeUnit?: string;
  foodNutrients?: {
    number?: string;
    name?: string;
    amount?: number;
    nutrientNumber?: string;
    nutrientName?: string;
    value?: number;
  }[];
};

export async function searchFoods(searchTerm: string): Promise<FoodSearchResult[]> {
  const apiKey = process.env.EXPO_PUBLIC_FDC_API_KEY ?? 'DEMO_KEY';
  const params = new URLSearchParams({
    query: searchTerm.trim(),
    dataType: 'Foundation,SR Legacy',
    pageSize: '20',
    format: 'abridged',
    api_key: apiKey,
  });
  const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?${params}`);

  if (response.status === 429) {
    throw new Error('Food search has reached its API request limit.');
  }
  if (!response.ok) {
    throw new Error(`Food search failed (${response.status}). Please try again.`);
  }

  const result: { foods?: UsdaFood[] } = await response.json();
  return (result.foods ?? []).map(food => {
    const proteinNutrient = food.foodNutrients?.find(nutrient =>
      nutrient.nutrientNumber === '203' ||
      nutrient.number === '203' ||
      nutrient.nutrientName?.toLowerCase() === 'protein' ||
      nutrient.name?.toLowerCase() === 'protein'
    );

    return {
      id: String(food.fdcId),
      name: food.brandOwner ? `${food.description} — ${food.brandOwner}` : food.description,
      serving: food.servingSize && food.servingSizeUnit
        ? `${food.servingSize} ${food.servingSizeUnit}`
        : '100 g',
      protein: proteinNutrient?.value ?? proteinNutrient?.amount ?? null,
    };
  });
}

export async function lookupBarcode(barcode: string): Promise<BarcodeFoodResult | null> {
  const url =
    `https://world.openfoodfacts.org/api/v3/product/${encodeURIComponent(barcode)}` +
    `?fields=${API_FIELDS}`;

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'AntiFitnessCleanup/1.0',
    },
  });

  if (!response.ok) throw new Error('Could not look up this food');

  const result: {
    status?: number | string;
    product?: {
      product_name?: string;
      brands?: string;
      serving_size?: string;
      nutriments?: {
        proteins_100g?: number;
      };
    };
  } = await response.json();
  const productFound =
    result.status === 1 ||
    result.status === 'success' ||
    result.status === 'success_with_warnings';
  if (!productFound || !result.product) return null;

  const product = result.product;

  return {
    name: [product.product_name, product.brands].filter(Boolean).join(' — '),
    serving: product.serving_size ?? '100 g',
    protein: product.nutriments?.proteins_100g ?? null,
  };
}