<template>
  <Select
    :modelValue="props.modelValue"
    :options="accounts"
    optionLabel="accountName"
    placeholder="Select an account"
    class="w-56"
    @update:modelValue="emit('update:modelValue', $event)"
    :loading="!accounts"
   />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useFetch } from '@vueuse/core';
import Select from 'primevue/select';

import type { AccountResponse } from '@/api/types';
import { accountsUrl } from '@/api/urls';
import { useToast } from 'primevue';

const props = defineProps<{
  modelValue: AccountResponse['data'][number] | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', accounts: AccountResponse['data']): void
}>()

const toast = useToast()

const { data: accountsResponse, onFetchError } = useFetch<AccountResponse>(accountsUrl).json()

onFetchError(() => {
  toast.add({ severity: 'error', summary: 'Unexpected error', detail: 'Oops, something went wrong. Please try to refresh the page' });
})

const accounts = computed(() => accountsResponse.value?.data ?? [])
</script>
