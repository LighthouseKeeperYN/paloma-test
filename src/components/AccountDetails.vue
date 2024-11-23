<template>
  <Card>
    <template #content>
      <table>
        <tbody>
          <tr>
            <td class="pr-24"><b>ID:</b></td>
            <td>{{ props.account.accountId }}</td>
          </tr>
          <tr>
            <td><b>Name:</b></td>
            <td>{{ props.account.accountName }}</td>
          </tr>
          <tr>
            <td><b>Address:</b></td>
            <td><address>{{ props.account.address }}</address></td>
          </tr>
          <tr>
            <td><b>Country:</b></td>
            <td>{{ props.account.country }}</td>
          </tr>
          <tr>
            <td><b>Currency:</b></td>
            <td>{{ props.account.currency }}</td>
          </tr>
          <tr>
            <td><b>Email:</b></td>
            <td><a class="underline" :href="`mailto:${props.account.email}`">{{ props.account.email }}</a></td>
          </tr>
          <tr>
            <td><b>Phone:</b></td>
            <td><a class="underline" :href="`tel:${props.account.phoneNumber}`">{{ props.account.phoneNumber }}</a></td>
          </tr>
        </tbody>
      </table>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import type { AccountResponse } from '@/api/types';

const props = defineProps<{
  account: AccountResponse['data'][number]
}>()
</script>

<style scoped>

</style>
