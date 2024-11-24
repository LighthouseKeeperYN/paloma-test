<template>
  <div class="flex gap-4">
    <MultiSelect v-model="selectedCurrencies" :options="currencies" filter placeholder="Select currency"
      :maxSelectedLabels="3" class="w-60" />
    <InputNumber v-model="minTransactionValue" placeholder="Minimum transaction value" class="w-60" />
    <InputNumber v-model="maxTransactionValue" placeholder="Maximum transaction value" class="w-60" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import MultiSelect from "primevue/multiselect";
import { InputNumber } from "primevue";
import type { Transaction } from '@/api/types';

const props = defineProps<{
  modelValue: Transaction[]
  transactions: Transaction[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', transactions: Transaction[]): void
}>()

const currencies = ["USD", "CAD", "EUR", "GBP", "AUD", "JPY"];
const selectedCurrencies = ref<Transaction['currency'][]>([]);

const minTransactionValue = ref<number>();
const maxTransactionValue = ref<number>();

watch([props.transactions, selectedCurrencies, minTransactionValue, maxTransactionValue], () => {
  const filteredTransactions = props.transactions.filter((transaction) => {
    const isCurrencyFilterPassed = selectedCurrencies.value.length
      ? selectedCurrencies.value?.some((currency) => currency === transaction.currency)
      : true

    const isMinTransactionFilterPassed = typeof minTransactionValue.value === 'number'
      ? transaction.amount >= minTransactionValue.value
      : true

    const isMaxTransactionFilterPassed = typeof maxTransactionValue.value === 'number'
      ? transaction.amount <= maxTransactionValue.value
      : true

    return isCurrencyFilterPassed && isMinTransactionFilterPassed && isMaxTransactionFilterPassed
  })

  emit('update:modelValue', filteredTransactions)
}, { immediate: true })

</script>

<style scoped></style>
