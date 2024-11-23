<template>
  <Select
    :modelValue="props.modelValue"
    :options="accounts"
    optionLabel="accountName"
    placeholder="Select an account"
    class="w-56"
    @update:modelValue="emit('update:modelValue', $event)"
   />
</template>

<script setup lang="ts">
import { useFetch } from '@vueuse/core'
import Select from 'primevue/select';
import {  computed, ref } from "vue";

import type { AccountResponse } from '@/api/types';
import { apiAccountsUrl } from '@/api/urls';

const props = defineProps<{
  modelValue?: AccountResponse['data'][number]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', accounts: AccountResponse['data']): void
}>()

const { data: accountsResponse } = useFetch<AccountResponse>(apiAccountsUrl).json()

const accounts = computed(() => accountsResponse.value?.data ?? [])

const selectedAccount = ref();
</script>
