<script>
  import Starred from './Starred.svelte';
  import {push} from 'svelte-spa-router'
  import api from '../services/apiService.js';
  export let transaction, group, checked;

  $: updateChekbox(group)
	$: updateGroup(checked)
  $: date = new Date(transaction.date);
  let value = { id: transaction.id, read: transaction.read }
	
	function updateChekbox(group) {
		checked = group.map(g => g.id).indexOf(value.id) >= 0
	}
	
	function updateGroup(checked) {
		const index = group.map(g => g.id).indexOf(value.id)
		if (checked) {
			if (index < 0) {
				group.push(value)
				group = group
			}
		} else {
			if (index >= 0) {
				group.splice(index, 1)
				group = group
			}
		}
	}

  const toggleStar = async (e) => {
    e.stopPropagation();
    let result = await api.updateTransaction(transaction.id, { starred: !transaction.starred });
    if (result && !result.error) { transaction = result }
    else { console.log(result.error) }
  }

  const markRead = async (read) => {
    if(transaction.read == read) { return }
    let result = await api.updateTransaction(transaction.id, { read: read });
    if (result && !result.error) { transaction = result }
    else { console.log(result.error) }
  }

  const checkItem = async (e) => {
    e.stopPropagation();
    checked = !checked;
  }

  const openItem = async () => {
    markRead(true);
    push('/transactions/' + transaction.id)
  }

  const isToday = (checkDate) => {
    const today = new Date()
    return checkDate.getDate() === today.getDate() &&
      checkDate.getMonth() === today.getMonth() &&
      checkDate.getFullYear() === today.getFullYear();
  }

  const isThisYear = (checkDate) => {
    const today = new Date()
    return checkDate.getFullYear() === today.getFullYear();
  }

</script>

<tr class:is_read="{transaction.read}" class="row" on:click={openItem}>
  <td class="is-narrow" on:click={checkItem}><input class="" type="checkbox" bind:checked={checked} on:click={checkItem} value={value}></td>
  <td class="is-narrow is-hidden-mobile" on:click={toggleStar}><Starred starred={transaction.starred} /></td>
  <td class:green="{transaction.amount < 0}" class="is-hidden-mobile has-text-right currency">${transaction.amount.toFixed(2)}</td>
  <td class="is-hidden-mobile">{ transaction.merchantName || transaction.name}</td>
  <td class="is-hidden-tablet">
    <div class="is-flex is-flex-direction-column">
      <div class:green="{transaction.amount < 0}" class="bold">${transaction.amount.toFixed(2)}</div>
      <div>{ transaction.merchantName || transaction.name}</div>
    </div>
  </td>
  <td class="has-text-right date is-hidden-mobile">
    { 
      isToday(date) 
      ? date.toLocaleString("en", { hour: 'numeric', minute: 'numeric' })
      : isThisYear(date)
      ? date.toLocaleString("en", { month: 'short', day: 'numeric' })
      : date.toLocaleString("en", { year: '2-digit', month: 'short', day: 'numeric' })
    }
  </td>
  <td class="is-narrow has-text-right date is-hidden-tablet">
    <div class="is-flex is-flex-direction-column is-align-items-space-between">
      <div>
        { 
          isToday(date) 
          ? date.toLocaleString("en", { hour: 'numeric', minute: 'numeric' })
          : isThisYear(date)
          ? date.toLocaleString("en", { month: 'short', day: 'numeric' })
          : date.toLocaleString("en", { year: '2-digit', month: 'short', day: 'numeric' })
        }
      </div>
      <div on:click={toggleStar}>
        <Starred starred={transaction.starred} />
      </div>
    </div>
  </td>
</tr>

<style>

</style>