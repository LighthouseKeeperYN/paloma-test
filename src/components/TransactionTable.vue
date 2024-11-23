<template>
  <div class="max-w-[960px]">
    <div class="my-4">
      <Button @click="onButtonClick">{{ isPaused ? 'Resume' : 'Pause' }}</Button>

      Connection status:
      <span :class="isPaused ? 'text-red-600' : 'text-green-600'">
        {{ isPaused ? 'Paused' : 'Active' }}
      </span>
    </div>

    <DataTable :value="transactions" tableStyle="min-width: 50rem">
      <Column field="destinationName" header="Account"></Column>
      <Column field="amount" header="Amount"></Column>
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
import type { AccountResponse } from '@/api/types';

const props = defineProps<{
  account: AccountResponse['data'][number]
}>()

const transactions = ref([])

const accountId = computed(() => transactionsUrl(props.account.accountId))
const { data, open, close } = useWebSocket(accountId)

const isPaused = ref(false)

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
  transactions.value = []

  if (isPaused.value) {
    close()
  }
})

watch(data, () => {
  transactions.value.push(JSON.parse(data.value))
})
</script>

<style scoped>

</style>
