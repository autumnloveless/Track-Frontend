<script>
  import Starred from './Starred.svelte';
  import api from '../services/apiService.js';
  export let transaction;
</script>

<tr class:is_read="{transaction.read}">
  <td class="is-narrow"><input type="checkbox" name="" id=""></td>
  <td class="is-narrow"><Starred starred={transaction.starred}/></td>
  <td class="has-text-right ">${transaction.amount.toFixed(2)}</td>
  <td>{ transaction.merchantName || transaction.name}</td>
  <td>{new Date(transaction.date).toLocaleString([],{hour: '2-digit', minute:'2-digit'})}</td>
</tr>