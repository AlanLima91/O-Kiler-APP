import React,{useState,useReducer} from 'react';
import { Entypo } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, Text, View,TouchableOpacity,ActivityIndicator } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import reducer, {TEXT_CHANGE,BOOL_CHANGE} from "../components/reducer";
import { TextInput as PaperTextInput } from 'react-native-paper';
import * as Layout from '../constants/Layout';
import * as api from '../services/question';
export default function AnswerScreen() {
    const [error, setError] = useState(null);
    const [haveChange, setHaveChange] = useState(false);
    const [loading, setLoading] = useState(false);
    const [answers, setAnswers] = useState([]);
    const fields = [
        {name: 'name',label:"Name", placeholder: 'Name', value:"",required: true},
        {name: 'answer',label:"Reponse", placeholder: 'Reponse', value:"",required: false},
        {name: 'tag',label:"Tag", placeholder: 'Tag', value:"",required: false},
    ];
    const onSubmit = async () => {
        if (stateEncaiss[0].value.length === 0) {
            setError("Le champs name doit être remplit")
            return;
        } else if (answers.length === 0){
            setError("Vous devez ajouter des réponses")
            return;
        }
        setLoading(true);
        try {
            let data = {question:stateEncaiss[0].value,answers:answers};
            let response = await api.newQuestion(data);
            setAnswers([]);
            for (var i = 0; i < stateEncaiss.length; i++) {
                changeText(stateEncaiss[i].name,"");
            }
            alert("Question crée");
            setLoading(false);
            setError(null);
        } catch(e){
            setError(e.message);
            setLoading(false);
        }
    }
    const [stateEncaiss, dispatch] = useReducer(reducer, fields);
    const changeText = (name,text) => {
        if(!haveChange) setHaveChange(true);
        dispatch({type: TEXT_CHANGE, name, text});
    };

    const onAdd = () => {
        if (stateEncaiss[1].value.length > 0 && stateEncaiss[2].value.length > 0) {
            console.log(stateEncaiss);
            answers.push({answer:stateEncaiss[1].value,tag:stateEncaiss[2].value});
            setAnswers([...answers]);
            changeText("tag","");
            changeText("answer","");
            setError(null);
        } else {
            setError("Les deux champs doivent être remplit");
        }
    }

    const onRemove = (key) => {
        const temp = [...answers];

        temp.splice(key, 1);

        setAnswers(temp);
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text>Questions</Text>
            {error && (
              <Text style={styles.errorText}>{error}</Text>
            )}
            {stateEncaiss.map((field,key) => {
                return (
                    <PaperTextInput
                        key={key}
                        mode={"outlined"}
                        label={field.label}
                        placeholder={field.placeholder}
                        secureTextEntry={field.secure}
                        value={field.value}
                        onChangeText={(text) => changeText(field.name,text)}
                        required={field.required}
                        style={{backgroundColor: "#fff",marginTop:10}}
                    />
                );
            })}
            <TouchableOpacity style={{ justifyContent: "center", marginTop: 20, marginLeft: 0 }} onPress={() => onAdd()}>
                <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={["#0093FF", "#00DEFF"]} style={styles.buttonAdd} >
                    <Text style={styles.buttonSubmit}>Ajouter</Text>
                </LinearGradient>
            </TouchableOpacity>
            {answers.map((answer,key)=> {
                return (
                    <View style={styles.item} key={key}>
                        <Text>Réponse : {answer.answer}</Text>
                        <Text>Tag : {answer.tag}</Text>
                        <TouchableOpacity onPress={() => onRemove(key)}>
                            <Entypo name="circle-with-cross" size={20} color="red" />
                        </TouchableOpacity>
                    </View>
                );
            })}
            <TouchableOpacity disabled={!haveChange} style={{ justifyContent: "center", marginTop: 20, marginLeft: 0,opacity:(haveChange)?1:0.3 }} onPress={() => onSubmit()}>
                <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={["#0093FF", "#00DEFF"]} style={styles.button} >
                    {loading ? (
                        <ActivityIndicator size="large" color="#fff" />
                    ):(
                        <Text style={styles.buttonSubmit}>VALIDER</Text>
                    )}
                </LinearGradient>
            </TouchableOpacity>
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
    item:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:10
    },
    button : {
        alignItems: 'center', 
        borderRadius: 15, 
        width: '100%', 
        paddingTop: 13, 
        paddingBottom: 13,
        paddingLeft:Layout.width*0.07,
        paddingRight:Layout.width*0.07
    },
    buttonAdd : {
        alignItems: 'center', 
        borderRadius: 15, 
        width: '50%', 
        paddingTop: 13, 
        paddingBottom: 13,
        paddingLeft:Layout.width*0.07,
        paddingRight:Layout.width*0.07
    },
    buttonSubmit:{
        color:"#fff",
        fontWeight:'700'
    }
});
