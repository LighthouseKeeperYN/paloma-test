<template>
  <div class="max-w-[960px]">
    <TransactionFilter class="mt-4" v-model="filteredTransactions" :transactions="transactions" />

    <div class="my-4">
      <Button @click="onButtonClick">{{ isPaused ? 'Resume' : 'Pause' }}</Button>

      Connection status:
      <span :class="isPaused ? 'text-red-600' : 'text-green-600'">
        {{ isPaused ? 'Paused' : 'Active' }}
      </span>
    </div>


    <DataTable
      :value="filteredTransactions"
      tableStyle="min-width: 50rem"
      paginator
      :rows="10"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      :loading="!isPaused && !transactions.length"
    >
      <Column field="destinationName" header="Account"></Column>
      <Column field="amount" header="Amount">
        <template #body="{ data }">
          {{ data.direction === 'inflow' ? '+' : '-' }}{{ data.amount }}
        </template>
      </Column>
      <Column field="currency" header="Currency"></Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useWebSocket } from '@vueuse/core'
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { transactionsUrl } from '@/api/urls';
import type { AccountResponse, Transaction } from '@/api/types';
import TransactionFilter from './TransactionFilter.vue';
import { useToast } from 'primevue';

const props = defineProps<{
  account: AccountResponse['data'][number]
}>()

const toast = useToast();

const isPaused = ref<boolean>(false)
const transactions = ref<Transaction[]>([])
const filteredTransactions = ref<Transaction[]>([])
const accountId = computed(() => transactionsUrl(props.account.accountId))

const { data, open, close, status } = useWebSocket(accountId, {
  immediate: !isPaused.value,
  autoReconnect: {
    retries: 0,
    onFailed() {
      toast.add({ severity: 'error', summary: 'Unexpected error', detail: 'Oops, something went wrong. Please try to refresh the page' });
    },
  },
 })

const onButtonClick = () => {
  if (isPaused.value) {
    isPaused.value = false
    open()
  } else {
    isPaused.value = true
    close()
  }
}

watch(accountId, () => {
  transactions.value.length = 0

  if (isPaused.value) {
    close()
  }
})

watch(data, () => {
  transactions.value.unshift(JSON.parse(data.value ?? ''))
})

watch(status, () => {
  status.value
})
</script>

<style scoped>

</style>
