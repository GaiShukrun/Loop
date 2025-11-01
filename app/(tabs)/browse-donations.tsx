import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useApi } from '@/hooks/useApi';
import { ArrowLeft } from 'lucide-react-native';

// API URL - should match the one in useApi.js
const API_URL = 'http://10.0.0.5:3000';

interface ClothingItem {
  type: string;
  size: string;
  color: string;
  gender: string;
  quantity: number;
  images: string[];
}

interface ToyItem {
  name: string;
  description: string;
  condition: string;
  quantity: number;
  images: string[];
}

interface Donation {
  _id: string;
  userId: {
    _id: string;
    username: string;
    firstname: string;
    lastname: string;
    address?: string;
    city?: string;
    phoneNumber?: string;
    addressNotes?: string;
  };
  donationType: 'clothes' | 'toys';
  status: string;
  clothingItems: ClothingItem[];
  toyItems: ToyItem[];
  createdAt: string;
  pickupAddress?: string;
}

export default function BrowseDonations() {
  const router = useRouter();
  const api = useApi();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const fetchDonations = async () => {
    try {
      const response = await (api as any).get('/donations/all');
      if (response && response.success) {
        // Filter to only show donations where user has set their address
        const itemsWithAddress = response.donations.filter(
          (donation: Donation) => donation.userId?.address && donation.userId?.city
        );
        setDonations(itemsWithAddress);
      } else {
        setError('Failed to load donations');
      }
    } catch (error) {
      console.error('Error fetching donations:', error);
      setError('Failed to load donations');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchDonations();
  };

  const getItemDescription = (donation: Donation) => {
    if (donation.donationType === 'clothes' && donation.clothingItems.length > 0) {
      const item = donation.clothingItems[0];
      const count = donation.clothingItems.length;
      return `${item.type} - ${item.size} - ${item.gender}${count > 1 ? ` +${count - 1} more` : ''}`;
    } else if (donation.donationType === 'toys' && donation.toyItems.length > 0) {
      const item = donation.toyItems[0];
      const count = donation.toyItems.length;
      return `${item.name} - ${item.condition}${count > 1 ? ` +${count - 1} more` : ''}`;
    }
    return 'No items';
  };

  const getItemImage = (donation: Donation) => {
    let imageUrl = null;
    
    if (donation.donationType === 'clothes' && donation.clothingItems[0]?.images[0]) {
      imageUrl = donation.clothingItems[0].images[0];
    } else if (donation.donationType === 'toys' && donation.toyItems[0]?.images[0]) {
      imageUrl = donation.toyItems[0].images[0];
    }
    
    if (imageUrl) {
      // If the URL is a relative path (starts with /), prepend the API_URL
      if (imageUrl.startsWith('/')) {
        const fullUrl = `${API_URL}${imageUrl}`;
        console.log('Constructed full image URL:', fullUrl);
        return fullUrl;
      }
      // Otherwise return as-is (for backward compatibility with old local URIs)
      console.log('Image URL:', imageUrl);
      return imageUrl;
    }
    
    return null;
  };

  const getTotalQuantity = (donation: Donation) => {
    if (donation.donationType === 'clothes') {
      return donation.clothingItems.reduce((sum, item) => sum + item.quantity, 0);
    } else {
      return donation.toyItems.reduce((sum, item) => sum + item.quantity, 0);
    }
  };

  const renderDonationItem = ({ item }: { item: Donation }) => {
    const imageUri = getItemImage(item);
    const description = getItemDescription(item);
    const totalQty = getTotalQuantity(item);
    const donorName = `${item.userId?.firstname || ''} ${item.userId?.lastname || ''}`.trim() || item.userId?.username || 'Anonymous';

    return (
      <View
        style={styles.donationCard}
      >
        {/* Image on the left */}
        <View style={styles.imageContainer}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.donationImage} />
          ) : (
            <View style={[styles.donationImage, styles.placeholderImage]}>
              <Text style={styles.placeholderText}>No Image</Text>
            </View>
          )}
        </View>

        {/* Details on the right */}
        <View style={styles.detailsContainer}>
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>

          <View style={styles.metaRow}>
            <Text style={styles.metaText}>Qty: {totalQty}</Text>
            <Text style={styles.metaText}>•</Text>
            <Text style={styles.metaText}>By: {donorName}</Text>
          </View>

          {/* Show user's address from profile */}
          {item.userId?.city && (
            <View style={styles.locationContainer}>
              <Text style={styles.locationText} numberOfLines={1}>
                📍 {item.userId.city}
              </Text>
              {item.userId.address && (
                <Text style={styles.addressText} numberOfLines={1}>
                  {item.userId.address}
                </Text>
              )}
            </View>
          )}
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#BE3E28" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Browse Items</Text>
      </View>

      {/* Donations List */}
      <FlatList
        data={donations}
        renderItem={renderDonationItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#BE3E28']} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No items available yet</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF2E9',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCF2E9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FCF2E9',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  listContainer: {
    padding: 16,
  },
  donationCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    width: 120,
    height: 120,
  },
  donationImage: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#999',
    fontSize: 12,
  },
  detailsContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  donationType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#BE3E28',
  },
  statusBadge: {
    backgroundColor: '#FFA500',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusScheduled: {
    backgroundColor: '#4CAF50',
  },
  statusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    lineHeight: 20,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#777',
    marginRight: 6,
  },
  locationContainer: {
    marginTop: 6,
  },
  locationText: {
    fontSize: 13,
    color: '#2D5A27',
    fontWeight: '600',
    marginBottom: 2,
  },
  addressText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});
