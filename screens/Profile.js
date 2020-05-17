import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View,TouchableOpacity,ActivityIndicator } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import * as Layout from '../constants/Layout';
import * as api from '../services/question';
import * as apiUser from '../services/user';
export default function ProfileScreen() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [questions,setQuestions] = useState(null);
    const [qEnd,setQEnd] = useState(false);
    const [numQ,setNumQ] = useState(0);
    const [tags, setTags] = useState([]);
    const getQuestion = async () => {
        try {
            let response = await api.getAllQuestion(5);
            setQuestions(response.questions);
        } catch(e) {
            setError(e.message);
        }
    }

    const sendTags = async (tags) => {
        try {
            let response = await apiUser.addTags({tags:tags});
            setQEnd(true)
        } catch(e) {
            console.log(e.message);
            setError(e.message);
        }
    }
    const sendAnswer = (id) => {
        tags.push(questions[numQ].answers[id].tag);
        if (numQ === questions.length-1) {
            sendTags(tags);
        } else {
            setNumQ(numQ+1);
        }
    }
    useEffect(()=> {
        getQuestion();
    },[])
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text>Profile</Text>
            {questions && !qEnd && (
                <View style={{marginTop:20}}>
                    <Text>Quesion {numQ+1} sur {questions.length} : {questions[numQ].question}</Text>
                    <View>
                        {questions[numQ].answers.map((question,i)=> {
                            return (
                                <TouchableOpacity style={styles.button} onPress={()=> sendAnswer(i)} key={i}>
                                    <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={["#0093FF", "#00DEFF"]} style={styles.answer} >
                                        <Text style={styles.answerText}>{question.answer}</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            )}
            {qEnd && (
                <Text>Votre profile à été mise à jour.</Text>
            )}
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    contentContainer: {
        flex: 1,
        marginLeft:20,
        marginRight:20,
        marginTop:40
    },
    errorText: {
        color:"#E6265C",
        fontSize:15
    },
    tagList:{
        marginTop:20
    },
    button:{
        marginTop:10,
    },
    answer : {
        borderRadius: 15, 
        width: '100%', 
        paddingTop: 13, 
        paddingBottom: 13,
        paddingLeft:Layout.width*0.07,
        paddingRight:Layout.width*0.07
    },
    answerText:{
        color:"#fff",
        fontWeight:'700'
    },
});
