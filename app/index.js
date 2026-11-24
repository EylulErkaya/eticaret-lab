import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  Pressable,
  StyleSheet,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import UrunKarti from '../components/UrunKarti';
import { useSepet } from '../context/SepetContext';

export default function AnaSayfa() {
  const router = useRouter();

  // Görev 2: Sepetteki toplam ürün adedi
  const { toplamAdet } = useSepet();

  const [urunler, setUrunler] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [hata, setHata] = useState('');

  // Görev 4: Ürün arama
  const [arama, setArama] = useState('');

  async function urunleriGetir(aramaIfadesi = arama) {
    try {
      setYukleniyor(true);
      setHata('');

      const ifade = aramaIfadesi.trim();
      const adres = ifade
        ? `https://dummyjson.com/products/search?q=${encodeURIComponent(ifade)}`
        : 'https://dummyjson.com/products?limit=20';

      const cevap = await fetch(adres);

      if (!cevap.ok) {
        throw new Error('Ürünler alınamadı.');
      }

      const veri = await cevap.json();

      setUrunler(veri.products);
    } catch (error) {
      setHata(error.message);
    } finally {
      setYukleniyor(false);
    }
  }

  useEffect(() => {
    // Kullanıcı yazmayı bitirince (400 ms) istek gönderilir
    const zamanlayici = setTimeout(() => {
      urunleriGetir(arama);
    }, 400);

    return () => clearTimeout(zamanlayici);
  }, [arama]);

  return (
    <SafeAreaView
      style={styles.container}
      edges={['bottom', 'left', 'right']}
    >
      <View style={styles.ustAlan}>
        <Text style={styles.baslik}>
          E-Ticaret Mağazam
        </Text>

        <Pressable
          style={styles.sepetButon}
          onPress={() => router.push('/sepet')}
        >
          <Text style={styles.butonYazi}>
            Sepetim ({toplamAdet})
          </Text>
        </Pressable>
      </View>

      <TextInput
        style={styles.aramaKutusu}
        placeholder="Ürün ara (ör. phone)"
        value={arama}
        onChangeText={setArama}
        autoCapitalize="none"
        autoCorrect={false}
      />

      {yukleniyor ? (
        <ActivityIndicator
          size="large"
          color="#2563eb"
          style={styles.yukleme}
        />
      ) : hata ? (
        <View style={styles.mesajAlani}>
          <Text style={styles.hata}>{hata}</Text>

          <Pressable
            style={styles.tekrarButon}
            onPress={() => urunleriGetir()}
          >
            <Text style={styles.butonYazi}>
              Tekrar Dene
            </Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={urunler}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.liste}
          ListEmptyComponent={
            <Text>Gösterilecek ürün bulunamadı.</Text>
          }
          renderItem={({ item }) => (
            <UrunKarti
              urun={item}
              onPress={() =>
                router.push(`/urun/${item.id}`)
              }
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },

  ustAlan: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },

  baslik: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
  },

  sepetButon: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },

  butonYazi: {
    color: '#ffffff',
    fontWeight: 'bold',
  },

  aramaKutusu: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginHorizontal: 16,
    marginBottom: 12,
    fontSize: 15,
  },

  liste: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  yukleme: {
    flex: 1,
    justifyContent: 'center',
  },

  mesajAlani: {
    alignItems: 'center',
    marginTop: 40,
    padding: 16,
  },

  hata: {
    color: '#dc2626',
    marginBottom: 16,
    textAlign: 'center',
  },

  tekrarButon: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 8,
  },
});
