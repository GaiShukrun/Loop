import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';  
import { useAuth } from '@/context/AuthContext';
import useApi from '@/hooks/useApi';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Dimensions,
  StatusBar,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { GiftIcon, BabyIcon, ShirtIcon, LogOutIcon, CalendarIcon, CameraIcon } from 'lucide-react-native';

const windowWidth = Dimensions.get('window').width;

const DonationScreen = () => {
  const { requireAuth, isUserLoggedIn, logout } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [topDonors, setTopDonors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const api = useApi();

  const handleCategoryPress = (category) => {
    if (category === 'Clothing') {
      requireAuth(
        () => {
          // Navigate to the donation flow with the selected category
          console.log(`Selected category: ${category}`);
          router.push({
            pathname: '/(tabs)/donation-details',
            params: { type: 'clothes' }
          });
        },
        `Please sign in to donate ${category.toLowerCase()}`,
        '/(tabs)/donation-details',
        { type: 'clothes' }
      );
    } else if (category === 'Infant Toys') {
      requireAuth(
        () => {
          // Navigate to the donation flow with the selected category
          console.log(`Selected category: ${category}`);
          router.push({
            pathname: '/(tabs)/donation-details',
            params: { type: 'toys' }
          });
        },
        `Please sign in to donate ${category.toLowerCase()}`,
        '/(tabs)/donation-details',
        { type: 'toys' }
      );
    }
  };

  const handleRewardsPress = () => {
    requireAuth(
      () => {
        // Navigate to rewards page
        console.log('Navigate to rewards page');
      },
      'Sign in to view and manage your rewards'
    );
  };

  const handleSignOut = () => {
    logout();
  };


  // const handleClothingAnalyzer = () => {
  //   // Navigate to the clothing analyzer screen
  //   console.log('Navigate to clothing analyzer');
  //   router.push('/(tabs)/image-classifier');
  // };

  const onRefresh = async () => {
    setRefreshing(true);
    // Add any data refresh logic here
    // For example, if you need to refresh user data or donation categories
    
    // Simulate a delay for demonstration purposes
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await api.get('/leaderboard');
      if (response.success) {
        // Get only top 3 donors
        setTopDonors(response.leaderboard.slice(0, 3));
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={['#3498db', '#9b59b6']} // Android: Spinning colors
            tintColor="#e74c3c" // iOS: Spinner color
            title="Refreshing..." // iOS: Text under spinner
            titleColor="#e74c3c"
        />
        }
      >
        {/* Main Content */}
        <View style={styles.content}>
          {/* Header - removed */}
          <View style={styles.header}>
          </View>

          {/* Quick Donation Section */}
          <View style={styles.donationSection}>
            <View style={styles.titleContainer}>
              {/* <Text style={styles.title}>Ready to Donate?</Text> */}
              {/* {isUserLoggedIn && (
                <TouchableOpacity 
                  style={styles.signOutButton}
                  onPress={handleSignOut}
                >
                  <LogOutIcon color="white" size={16} style={styles.signOutIcon} />
                  <Text style={styles.signOutText}>Sign Out</Text>
                </TouchableOpacity>
              )} */}
            </View>
            {/* <Text style={styles.subtitle}>Choose a donation category</Text> */}

            {/* CTA Cards - Enhanced */}
            <View style={styles.categories}>
              <TouchableOpacity 
                style={styles.ctaCard}
                onPress={() => handleCategoryPress('Infant Toys')}
                activeOpacity={0.8}
              >
                <View style={styles.ctaIconContainer}>
                  <Text style={styles.ctaEmoji}>🎁</Text>
                </View>
                <View style={styles.ctaTextContainer}>
                  <Text style={styles.ctaTitle}>שתף פריטים</Text>
                  <Text style={styles.ctaSubtitle}>Share Items</Text>
                  <Text style={styles.ctaDescription}>Share toys, books, clothes and more with your community</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Clothing Analyzer Button */}
            {/* <TouchableOpacity 
              style={[styles.categoryCard, { backgroundColor: '#4A6FA5', width: '100%', marginBottom: 16 }]}
              onPress={handleClothingAnalyzer}
            >
              <View style={[styles.categoryIconContainer, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                <CameraIcon color="white" size={32} />
              </View>
              <Text style={[styles.categoryTitle, { color: 'white' }]}>Clothing Analyzer</Text>
              <Text style={[styles.categoryDescription, { color: 'white' }]}>Identify clothing items with AI</Text>
            </TouchableOpacity> */}

            {/* Browse Items Button - Enhanced */}
            <TouchableOpacity 
              style={styles.ctaCardSecondary}
              onPress={() => router.push('/(tabs)/browse-donations')}
              activeOpacity={0.8}
            >
              <View style={styles.ctaIconContainer}>
                <Text style={styles.ctaEmoji}>🔍</Text>
              </View>
              <View style={styles.ctaTextContainer}>
                <Text style={styles.ctaTitle}>עיין בפריטים</Text>
                <Text style={styles.ctaSubtitle}>Browse Items</Text>
                <Text style={styles.ctaDescription}>Discover items shared by your neighbors</Text>
              </View>
            </TouchableOpacity>

            {/* Leaderboard Section - Enhanced */}
            <View style={styles.leaderboardContainer}>
              <View style={styles.leaderboardHeader}>
                <Text style={styles.leaderboardTitle}>🏆 Leaderboard</Text>
                <TouchableOpacity 
                  style={styles.viewAllButtonEnhanced}
                  onPress={() => router.push('/leaderboard')}
                >
                  <Text style={styles.viewAllText}>View All</Text>
                </TouchableOpacity>
              </View>

              {/* Leaderboard Rankings */}
              <View style={styles.leaderboardList}>
                {isLoading ? (
                  <ActivityIndicator size="small" color="#BE3E28" />
                ) : topDonors.length > 0 ? (
                  topDonors.map((donor, index) => (
                    <View 
                      key={donor.rank}
                      style={[
                        styles.leaderboardItem,
                        index === 0 && styles.firstPlace,
                        index === 1 && styles.secondPlace,
                        index === 2 && styles.thirdPlace
                      ]}
                    >
                      {/* Rank Badge with Medal */}
                      <View style={styles.rankBadge}>
                        <Text style={styles.rankMedal}>
                          {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${donor.rank}`}
                        </Text>
                      </View>
                      
                      {/* Avatar */}
                      <View 
                        style={[
                          styles.userAvatar,
                          index === 0 && styles.firstPlaceAvatar,
                          index === 1 && styles.secondPlaceAvatar,
                          index === 2 && styles.thirdPlaceAvatar
                        ]}
                      >
                        {donor.profileImage ? (
                          <Image 
                            source={{ uri: donor.profileImage }} 
                            style={styles.avatarImage} 
                          />
                        ) : (
                          <Text style={styles.avatarText}>
                            {donor.name.charAt(0).toUpperCase()}
                          </Text>
                        )}
                      </View>
                      
                      {/* User Info */}
                      <View style={styles.userInfo}>
                        <Text style={styles.userName}>{donor.name}</Text>
                        <View style={styles.pointsContainer}>
                          <Text style={styles.pointsIcon}>⭐</Text>
                          <Text style={styles.points}>{donor.points} points</Text>
                        </View>
                      </View>
                    </View>
                  ))
                ) : (
                  <Text style={styles.noDataText}>No leaderboard data available</Text>
                )}
              </View>
            </View>

            {/* Enhanced Stats Bar */}
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Text style={styles.statIcon}>📦</Text>
                <Text style={styles.statNumber}>50+</Text>
                <Text style={styles.statLabel}>Items Shared</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statIcon}>⭐</Text>
                <Text style={styles.statNumber}>10k+</Text>
                <Text style={styles.statLabel}>Points Earned</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statIcon}>🔄</Text>
                <Text style={styles.statNumber}>200+</Text>
                <Text style={styles.statLabel}>In Progress</Text>
              </View>
            </View>

            {/* How It Works Section */}
            <View style={styles.howItWorksContainer}>
              <Text style={styles.howItWorksTitle}>איך זה עובד?</Text>
              
              <View style={styles.stepContainer}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>1</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>הוסף כתובת איסוף</Text>
                  <Text style={styles.stepDescription}>
                    הוסף את הכתובת שלך בפרופיל כדי שאנשים יוכלו לאסוף פריטים ממך
                  </Text>
                </View>
              </View>
              
              <View style={styles.stepContainer}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>2</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>צלם ופרסם פריטים</Text>
                  <Text style={styles.stepDescription}>
                    צלם תמונות ברורות של הפריטים שלך ופרסם אותם כדי שהקהילה תוכל לראות
                  </Text>
                </View>
              </View>
              
              <View style={styles.stepContainer}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>3</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>שתף והתחבר</Text>
                  <Text style={styles.stepDescription}>
                    אנשים יכולים לעיין בפריטים שלך ולתאם איסוף ישירות ממך
                  </Text>
                </View>
              </View>
            </View>

            {/* Community Sharing CTA Section */}
            <View style={styles.missionContainer}>
              <Text style={styles.missionTitle}>שתף פריטים עם הקהילה</Text>
              <Text style={styles.missionText}>
                ברוכים הבאים לפלטפורמה לשיתוף פריטים קהילתי. כאן תוכל לשתף פריטים שאינך משתמש בהם יותר עם אנשים בקהילה שלך.
                המשימה שלנו היא ליצור עתיד בר-קיימא על ידי מתן חיים חדשים לפריטים שלך.
              </Text>
              <TouchableOpacity 
                style={styles.ctaButton}
                onPress={() => handleCategoryPress('Infant Toys')}
                activeOpacity={0.8}
                accessibilityLabel="Start Sharing"
                accessibilityRole="button"
              >
                <Text style={styles.ctaButtonText}>התחל לשתף</Text>
                <Text style={styles.ctaButtonSubtext}>Start Sharing</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF2E9',
  },
 
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 1,
    backgroundColor: '#FCF2E9',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  signOutButton: {
    backgroundColor: '#BE3E28',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  signOutText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 4,
  },
  signOutIcon: {
    marginRight: 4,
  },
  donationSection: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  categories: {
    flexDirection: 'column',
    marginBottom: 24,
  },
  // Enhanced CTA Card Styles
  ctaCard: {
    backgroundColor: '#E8F5E9',
    padding: 20,
    borderRadius: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  ctaCardSecondary: {
    backgroundColor: '#E3F2FD',
    padding: 20,
    borderRadius: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  ctaIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ctaEmoji: {
    fontSize: 32,
  },
  ctaTextContainer: {
    flex: 1,
  },
  ctaTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2D5A27',
    marginBottom: 2,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  ctaSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A6F45',
    marginBottom: 4,
  },
  ctaDescription: {
    fontSize: 14,
    color: '#2c2c2c',
    lineHeight: 18,
  },
  // Legacy styles (keep for compatibility)
  categoryCard: {
    padding: 16,
    borderRadius: 16,
    width: windowWidth * 0.44,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  categoryIconContainer: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 6,
  },
  categoryDescription: {
    fontSize: 14,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  statIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#6f6f6f',
    textAlign: 'center',
    fontWeight: '500',
  },

  leaderboardContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  leaderboardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  leaderboardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2D5A27',
  },
  viewAllButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#FCF2E9',
    borderRadius: 20,
  },
  viewAllButtonEnhanced: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'transparent',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2D5A27',
  },
  viewAllText: {
    color: '#2D5A27',
    fontSize: 14,
    fontWeight: '600',
  },
  leaderboardList: {
    gap: 10,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderLeftWidth: 4,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  firstPlace: {
    borderLeftColor: '#FFD700',
    backgroundColor: '#FFFEF5',
  },
  secondPlace: {
    borderLeftColor: '#C0C0C0',
    backgroundColor: '#FAFAFA',
  },
  thirdPlace: {
    borderLeftColor: '#CD7F32',
    backgroundColor: '#FFF8F0',
  },
  rankBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  rankMedal: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 2,
    backgroundColor: '#F5F5F5',
  },
  firstPlaceAvatar: {
    borderColor: '#FFD700',
    backgroundColor: '#FFFDE7',
  },
  secondPlaceAvatar: {
    borderColor: '#C0C0C0',
    backgroundColor: '#F5F5F5',
  },
  thirdPlaceAvatar: {
    borderColor: '#CD7F32',
    backgroundColor: '#FFF3E0',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c2c2c',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2c2c2c',
    marginBottom: 4,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pointsIcon: {
    fontSize: 14,
  },
  points: {
    color: '#2c2c2c',
    fontSize: 15,
    fontWeight: '600',
  },
  missionContainer: {
    backgroundColor: '#FFF8F0',
    borderRadius: 16,
    padding: 24,
    marginTop: 0,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E8D0B3',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  missionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D5A27',
    marginBottom: 12,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  missionText: {
    fontSize: 15,
    color: '#2c2c2c',
    lineHeight: 22,
    textAlign: 'right',
    writingDirection: 'rtl',
    marginBottom: 20,
  },
  ctaButton: {
    backgroundColor: '#2D5A27',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    minHeight: 44,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  ctaButtonSubtext: {
    fontSize: 13,
    color: '#E8F5E9',
    fontWeight: '500',
  },
  howItWorksContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginTop: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  howItWorksTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D5A27',
    marginBottom: 20,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  stepContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 20,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    marginLeft: 12,
  },
  stepNumberText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D5A27',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D5A27',
    marginBottom: 4,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  stepDescription: {
    fontSize: 14,
    color: '#2c2c2c',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  scrollView: {
    flex: 1,
  },
  navIcon: {
    width: 60,
    height: 60,
    
  },
  navIcon1: {
    width: 75,
    height: 70,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  noDataText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
});

export default DonationScreen;