import axiosInstance from "@/adaptors/axiosConfig";
import RadioButton from "@/components/RadioButton";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Pressable,
} from "react-native";
type Answer = {
  id: number;
  value: string;
  relationAnswer: string;
};

const Question: React.FC = () => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [data, setData] = useState<QuestionData>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const onRefresh = () => {
    setRefreshing(true);
    setAnswers([]);
    fetchQuestions().then(() => setRefreshing(false));
  };
  const fetchQuestions = async () => {
    try {
      const response = await axiosInstance.get("/question");
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setLoading(false);
    }
  };
  const handleSendAnswers = async () => {
    try {
      const unansweredQuestions = data.filter(
        (item) => !answers.some((answer) => answer.id === item.id)
      );

      if (unansweredQuestions.length > 0) {
        alert(`Please answer all questions before submitting.`);
        return;
      }
      const response = await axiosInstance.post("/submit-answers", answers, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setAnswers([])
      alert(`You scored ${response.data.score} points.`);
    } catch (error) {
      console.error("Error sending answers:", error);
      alert("Failed to submit answers.");
    }
  };
  useEffect(() => {
    fetchQuestions();
  }, []);
  const handleSelect = (
    questionId: number,
    value: string,
    relationAnswer: string
  ) => {
    const answerIndex = answers.findIndex((answer) => answer.id === questionId);

    if (answerIndex === -1) {
      setAnswers((prevAnswers) => [
        ...prevAnswers,
        { id: questionId, value, relationAnswer: relationAnswer },
      ]);
    } else {
      setAnswers((prevAnswers) =>
        prevAnswers.map((answer) =>
          answer.id === questionId ? { ...answer, value } : answer
        )
      );
    }
  };
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.gapTop}>
        <ThemedView style={styles.buttonBack}>
          <Pressable
            onPress={() => {
              router.replace("/");
            }}
          >
            <Text style={styles.buttonBackText}>Back</Text>
          </Pressable>
        </ThemedView>

        {data.map((item) => (
          <View key={item.id} style={styles.questionContainer}>
            <Text style={styles.questionText}>{item.question}</Text>
            <RadioButton
              options={item.choice}
              selectedOption={
                answers.find((answer) => answer.id === item.id)?.value || null
              }
              onSelect={(value) =>
                handleSelect(item.id, value, item.relationAnswer)
              }
            />
          </View>
        ))}

        <Pressable style={styles.buttonSend} onPress={handleSendAnswers}>
          <Text style={styles.buttonText}>Send Answers</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  gapTop: {
    top: 20,
  },
  buttonSend: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 50,
  },
  buttonText: {
    color: "#fff", 
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonBack: {
    alignSelf: "flex-start", 
    marginBottom: 20, 
    borderRadius: 4,
    width: 100,
    backgroundColor: "#000",
  },
  buttonBackText: {
    color: "#ffffff",
    padding: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 20, 
  },
  scrollContent: {
    paddingVertical: 10,
  },
  questionContainer: {
    marginBottom: 20,
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    elevation: 3, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, 
    shadowRadius: 4,
  },
  questionText: {
    fontSize: 20,
    marginBottom: 10,
  },
  selectedAnswer: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Question;
