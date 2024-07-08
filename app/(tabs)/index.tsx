import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Platform } from 'react-native';
import axios from 'axios';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [match, setMatch] = useState(null);

  useEffect(() => {
    const fetchLiveMatch = async () => {
      try {
        const response = await axios.get('https://v3.football.api-sports.io/fixtures', {
          params: { live: 'all', league: '4' },
          headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': '45c95a6a6849864d0868e4ad3d57befe' // Replace with your API key
          }
        });
        
        if (response.data.response.length > 0) {
          setMatch(response.data.response[0]);
        }
      } catch (error) {
        console.error('Error fetching live match:', error);
      }
    };

    fetchLiveMatch();
    const interval = setInterval(fetchLiveMatch, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/Cup.png')}
          style={styles.Logo}
        />
      }>
        
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">
          {match ? `${match.teams.home.name}` : 'Loading...'}
        </ThemedText>
        </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">
          vs
        </ThemedText>
        </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">
        {match ? `${match.teams.away.name}` : 'Loading...'}
        </ThemedText>
      </ThemedView>
      <ThemedText type="title"></ThemedText>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Spielstand</ThemedText>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">
          {match ? `${match.goals.home} - ${match.goals.away}` : 'Loading...'}
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  Logo: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
});
