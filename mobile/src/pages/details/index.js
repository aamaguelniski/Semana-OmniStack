import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';
import { View , Image, Text, Linking, TouchableOpacity} from 'react-native';

import LogoImg from '../../assets/logo.png';   
import Styles from './styles'; 

import * as MailComposer from 'expo-mail-composer';

export default function Details(){
    const Navigation = useNavigation();
    const Route = useRoute();
    const incident = Route.params.incident;
    const Message = `Olá ${incident.name}, eu gostaria de ajudar com ${ Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value) } no caso da ${incident.title}`;

    function navigateBack (){
        Navigation.goBack();
    }

    function sendEmail(){
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: [`${ incident.email }`],
            body: Message,
        })
    }

    function sendWhatsApp(){
        Linking.openURL(`whatsapp://send?phone=${ incident.whatsapp }&text=${Message}`);
    }

    return(
        <View style={Styles.container}>
            <View style={Styles.header}>
                <Image source={LogoImg} />

                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#e02041" />
                </TouchableOpacity>           
            </View>

            <View style={Styles.incident}>
                <Text style={Styles.incidentProperty, { marginTop: 0 }}>ONG</Text>
                <Text style={Styles.incidentValue}>{ incident.name } de { incident.city }/{ incident.uf }</Text>

                <Text style={Styles.incidentProperty}>CASO</Text>
                <Text style={Styles.incidentValue}>{ incident.description }</Text>

                <Text style={Styles.incidentProperty}>Valor</Text>
                <Text style={Styles.incidentValue}>{ Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value) }</Text>
            </View>

            <View style={Styles.contactBox}>
            <Text style={Styles.heroTitle}>Salve o dia!</Text>
                <Text style={Styles.heroTitle}>Seja o herói deste caso.</Text>

                <Text style={Styles.heroDescription}>Entre em contato</Text>

                <View style={Styles.actions} >
                    <TouchableOpacity 
                        onPress={sendWhatsApp}
                        style={Styles.action}
                    >
                        <Text style={Styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={sendEmail}
                        style={Styles.action}
                    >
                        <Text style={Styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}