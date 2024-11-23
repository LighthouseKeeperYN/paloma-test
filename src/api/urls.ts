export const apiUrl = 'https://paloma-financial-auditor-0aff70148dbe.herokuapp.com'

export const accountsUrl = `${apiUrl}/accounts`
export const transactionsUrl = (accountId: string, fromTransactionId?: string) => {
  return `${apiUrl}/accounts/${accountId}/transactions${fromTransactionId ? `?since=${fromTransactionId}` : ''}`
}
