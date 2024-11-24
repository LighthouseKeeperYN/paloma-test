<template>
  <div class="p-8">
    <AccountDropdown v-model="selectedAccount" />
    <AccountDetails v-if="selectedAccount" :account="selectedAccount" class="mt-4" />
    <TransactionTable v-if="selectedAccount" :account="selectedAccount" />
  </div>
</template>

<script setup lang="ts">
import { StorageSerializers, useStorage } from '@vueuse/core'
import type { AccountResponse } from '@/api/types';
import AccountDetails from '@/components/AccountDetails.vue';
import AccountDropdown from '@/components/AccountDropdown.vue';
import TransactionTable from '@/components/TransactionTable.vue';

const selectedAccount = useStorage<AccountResponse['data'][number] | null >(
  'selectedAccount',
  null,
  localStorage,
  { serializer: StorageSerializers.object }
)
</script>

<style scoped></style>
