<template>
  <Select v-model="selectedAccount" :options="accounts" optionLabel="accountName" placeholder="Select an account" class="w-56" />
</template>

<script setup lang="ts">
import { useFetch } from '@vueuse/core'
import Select from 'primevue/select';
import {  computed, ref } from "vue";

import type { AccountResponse } from '@/api/types';
import { apiAccountsUrl } from '@/api/urls';

const { data: accountsResponse } = useFetch<AccountResponse>(apiAccountsUrl).json()

const accounts = computed(() => accountsResponse.value?.data ?? [])

const selectedAccount = ref();
</script>
