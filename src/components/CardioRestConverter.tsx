import { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Spacing } from '../constants/theme';

interface LogItem {
  id: string;
  date: string;
  workout: string;
  mins: string;
  restHours: number;
}

export function CardioRestConverter() {
  const [minutes, setMinutes] = useState('');
  const [type, setType] = useState('running'); 
  const [hours, setHours] = useState<number | null>(null);
  const [perk, setPerk] = useState('');
  const [logs, setLogs] = useState<LogItem[]>([]);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const data = localStorage.getItem('workout_logs');
        if (data) {
          setLogs(JSON.parse(data));
        }
      }
    } catch (e) {
      console.log("Storage check loaded");
    }
  }, []);

  const calculateRest = () => {
    const num = parseFloat(minutes);
    if (isNaN(num) || num <= 0) return;

    let totalHours = 0;
    let text = '';

    if (type === 'running') {
      totalHours = parseFloat(((num * 6) / 60).toFixed(1));
      if (num <= 20) {
        text = 'Go eat some pizza and watch a movie.';
      } else if (num <= 45) {
        text = 'You earned a huge burger and gaming all afternoon.';
      } else {
        text = 'Take the next 2 days off from the gym completely.';
      }
    } else if (type === 'lifting') {
      totalHours = parseFloat(((num * 4) / 60).toFixed(1));
      if (num <= 20) {
        text = 'Go take a 30 minute nap on the couch.';
      } else if (num <= 45) {
        text = 'No alarm clock tomorrow, sleep in as late as you want.';
      } else {
        text = 'Order whatever you want for dinner tonight guilt-free.';
      }
    } else if (type === 'cycling') {
      totalHours = parseFloat(((num * 3) / 60).toFixed(1));
      if (num <= 20) {
        text = 'Snooze your morning alarm a couple times.';
      } else if (num <= 45) {
        text = 'Go grab an iced coffee and take it easy.';
      } else {
        text = 'Sit on the couch for the rest of the night.';
      }
    }

    setHours(totalHours);
    setPerk(text);

    const newItem: LogItem = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      workout: type,
      mins: minutes,
      restHours: totalHours
    };

    const newLogs = [newItem, ...logs].slice(0, 4);
    setLogs(newLogs);

    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('workout_logs', JSON.stringify(newLogs));
      }
    } catch (e) {
      console.log("Saved local state");
    }
    
    setMinutes('');
    Keyboard.dismiss();
  };

  const clearLogs = () => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem('workout_logs');
      }
    } catch (e) {}
    setLogs([]);
    setHours(null);
    setPerk('');
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.box}> 
        <Text style={styles.header}>Cardio-to-Rest Converter</Text>
        <Text style={styles.subtext}>Enter your workout duration below to see how many hours you should nap today.</Text>

        <View style={styles.buttonRow}>
          {['running', 'lifting', 'cycling'].map((workoutOption) => (
            <TouchableOpacity
              key={workoutOption}
              style={[styles.btn, type === workoutOption && styles.btnActive]}
              onPress={() => {
                setType(workoutOption);
                setHours(null);
                setPerk('');
              }}
            >
              <Text style={[styles.btnText, type === workoutOption && styles.btnTextActive]}>
                {workoutOption}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Workout Time (Minutes):</Text>
          <TextInput
            style={styles.field}
            placeholder="Example: 30"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={minutes}
            onChangeText={setMinutes}
          />
        </View>

        <TouchableOpacity style={styles.submitBtn} onPress={calculateRest}>
          <Text style={styles.submitBtnText}>Calculate Rest Time</Text>
        </TouchableOpacity>
        
        {hours !== null && (
          <View style={styles.resultsBox}>
            <Text style={styles.resultsTitle}>Calculation Complete!</Text>
            <Text style={styles.resultsText}>
              You earned <Text style={styles.redHighlight}>{hours} hours</Text> of couch time.
            </Text>
            <Text style={styles.perkText}>Perk: {perk}</Text>
          </View>
        )}

        {logs.length > 0 && (
          <View style={styles.historyBox}>
            <View style={styles.historyHeader}>
              <Text style={styles.historyTitle}>Saved Logs:</Text>
              <TouchableOpacity onPress={clearLogs}>
                <Text style={styles.deleteText}>Clear History</Text>
              </TouchableOpacity>
            </View>
            {logs.map((item) => (
              <View key={item.id} style={styles.historyRow}>
                <Text style={styles.historyText}>
                  - {item.date}: {item.mins}m of {item.workout} = {item.restHours}h rest
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    alignSelf: 'stretch',
  },
  box: { 
    paddingVertical: Spacing.one,
  },
  header: { 
    color: '#2d4150', 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 5 
  },
  subtext: { 
    color: '#718096', 
    fontSize: 13, 
    lineHeight: 18,
    marginBottom: 15 
  },
  buttonRow: { 
    flexDirection: 'row', 
    gap: 8, 
    marginBottom: 15 
  },
  btn: { 
    alignItems: 'center', 
    backgroundColor: '#f8fafc', 
    borderColor: '#cbd5e1', 
    borderRadius: 6, 
    borderWidth: 1, 
    flex: 1, 
    paddingVertical: 8 
  },
  btnActive: { 
    backgroundColor: '#ff4757', 
    borderColor: '#ff4757' 
  },
  btnText: { 
    color: '#64748b', 
    fontSize: 13 
  },
  btnTextActive: { 
    color: '#ffffff',
    fontWeight: 'bold'
  },
  inputContainer: { 
    marginBottom: 15 
  },
  inputLabel: { 
    color: '#4a5568', 
    fontSize: 14, 
    fontWeight: '600', 
    marginBottom: 5 
  },
  field: { 
    backgroundColor: '#f8fafc', 
    borderColor: '#cbd5e1', 
    borderRadius: 6, 
    borderWidth: 1, 
    color: '#334155', 
    fontSize: 14, 
    paddingHorizontal: 10, 
    paddingVertical: 8 
  },
  submitBtn: { 
    alignItems: 'center', 
    backgroundColor: '#2d4150', 
    borderRadius: 6, 
    paddingVertical: 12 
  },
  submitBtnText: { 
    color: '#ffffff', 
    fontSize: 14,
    fontWeight: 'bold' 
  },
  resultsBox: { 
    backgroundColor: '#eff6ff', 
    borderRadius: 6, 
    borderLeftColor: '#3b82f6', 
    borderLeftWidth: 4, 
    marginTop: 15, 
    padding: 12 
  },
  resultsTitle: { 
    color: '#1e40af', 
    fontSize: 14, 
    fontWeight: 'bold', 
    marginBottom: 2 
  },
  resultsText: { 
    color: '#1e3a8a', 
    fontSize: 13, 
    marginBottom: 4 
  },
  redHighlight: { 
    color: '#ff4757',
    fontWeight: 'bold' 
  },
  perkText: { 
    color: '#1e3a8a', 
    fontSize: 13, 
    fontStyle: 'italic' 
  },
  historyBox: { 
    borderTopColor: '#e2e8f0', 
    borderTopWidth: 1, 
    marginTop: 15, 
    paddingTop: 10 
  },
  historyHeader: { 
    alignItems: 'center', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 8 
  },
  historyTitle: { 
    color: '#4a5568', 
    fontSize: 13, 
    fontWeight: 'bold' 
  },
  deleteText: { 
    color: '#ff4757', 
    fontSize: 12 
  },
  historyRow: { 
    paddingVertical: 2 
  },
  historyText: { 
    color: '#64748b',
    fontSize: 13 
  }
});