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
  per100g: {
    calories: number | null;
    protein: number | null;
    carbs: number | null;
    fat: number | null;
  };
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
    throw new Error('Food search has reached its API request limit. Please try again later.');
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
    status: number;
    product?: {
      product_name?: string;
      brands?: string;
      serving_size?: string;
      nutriments?: {
        'energy-kcal_100g'?: number;
        proteins_100g?: number;
        carbohydrates_100g?: number;
        fat_100g?: number;
      };
    };
  } = await response.json();
  if (result.status !== 1 || !result.product) return null;

  const product = result.product;
  const nutrients = product.nutriments ?? {};

  return {
    name: [product.product_name, product.brands].filter(Boolean).join(' — '),
    serving: product.serving_size ?? '100 g',
    per100g: {
      calories: nutrients['energy-kcal_100g'] ?? null,
      protein: nutrients.proteins_100g ?? null,
      carbs: nutrients.carbohydrates_100g ?? null,
      fat: nutrients.fat_100g ?? null,
    },
  };
}