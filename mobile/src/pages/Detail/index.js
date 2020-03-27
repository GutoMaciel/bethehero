import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity, View, Image, Text, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer'; 

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Detail() {

  const navigation = useNavigation();
  const route = useRoute();

  const incident = route.params.incident;
  const message = `Hello, ${incident.name} friends. Im making contact because I want to help on the case ${incident.title} with the amount of ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}`

  function navigateBack() {
    navigation.goBack()
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Case hero: ${incident.title}`,
      recipients: [incident.email],
      body: message,
    });
  }

  function sendWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#e02141" />
        </TouchableOpacity>
      </View>

    <View style={styles.incident}>
        <Text style={[styles.incidentProperty, { marginTop: 0}]}>ONG:</Text>
        <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>
    
        <Text style={styles.incidentProperty}>Incident:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>
    
        <Text style={styles.incidentProperty}>Price:</Text>
        <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</Text>
    </View>

    <View style={styles.contactBox}>
      <Text style={styles.heroTitle}>Save the day!</Text>
      <Text style={styles.heroTitle}>Be the hero of this incident.</Text>

      <Text style={styles.heroDescription}>Make contact.</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
          <Text style={styles.actionText}>Whatsapp</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.action} onPress={sendMail}>
          <Text style={styles.actionText}>Email</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
  );
}
