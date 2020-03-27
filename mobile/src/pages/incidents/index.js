import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons';

import LogoImg from '../../assets/logo.png';   
import Styles from './styles';

import Api from "../../services/api";

export default function Incidents(){
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const Navigation = useNavigation();

    function navigateToDetail(incident){
        Navigation.navigate('Details', { incident });
    }

    async function loadIncidents() {
        if (loading){
            return;
        }

        if (total>0 && incidents.length == total){
            return;
        }

        setLoading(true);
        const response = await Api.get('incidents', {
            params: {page}
        });

        setIncidents([... incidents, ... response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(( ) => {
        loadIncidents();
    }, []);


    return(
        <View style={Styles.container}>
            <View style={Styles.header}>
                <Image source={LogoImg} />
                <Text style={Styles.headerText}>
                    Total de <Text style={Styles.headerTextBold}>{total} casos</Text>.
                </Text>            
            </View>

            <Text style={Styles.title}>Bem vindo!</Text>
            <Text style={Styles.descritption}>Escolha um dos casos listados abaixo e salve o dia.</Text>

            <FlatList 
                data={incidents}
                style={Styles.incidentList}
                keyExtractor={incident => String(incidents.id)}
                showsVerticalScrollIndicator = {false}
                onEndReached = {loadIncidents}
                onEndReachedThreshold = {0.2}
                renderItem={({ item: incidents }) => (
                    <View style={Styles.incident}>
                    <Text style={Styles.incidentProperty}>ONG</Text>
                    <Text style={Styles.incidentValue}>{ incidents.name }</Text>
 
                    <Text style={Styles.incidentProperty}>CASO</Text>
                    <Text style={Styles.incidentValue}>{ incidents.description }</Text>

                    <Text style={Styles.incidentProperty}>Valor</Text>
                    <Text style={Styles.incidentValue}>{ Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incidents.value) }</Text>

                    <TouchableOpacity
                        style={Styles.detailsButton}
                        onPress={() => navigateToDetail(incidents)}
                    >
                        <Text style={Styles.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#e02041" />
                    </TouchableOpacity>
                </View>
                )}
            />

        </View>
    );
}