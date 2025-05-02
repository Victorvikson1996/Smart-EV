import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigation } from './src/Navigation/RootNavigation';
import { AuthProvider } from './src/api';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'react-native-get-random-values';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>
          <SafeAreaProvider>
            <RootNavigation />
          </SafeAreaProvider>
        </AuthProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
