<template>
  <div class="p-8">
    <AccountDropdown v-model="selectedAccount" />
    <AccountDetails v-if="selectedAccount" :account="selectedAccount" class="mt-4" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { AccountResponse } from '@/api/types';
import AccountDetails from '@/components/AccountDetails.vue';
import AccountDropdown from '@/components/AccountDropdown.vue';

const selectedAccount = ref<AccountResponse['data'][number]>()
</script>

<style scoped></style>
