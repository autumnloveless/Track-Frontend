<script>
  import Fa from 'svelte-fa'
  import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
  import { faSquare, faMinusSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons'
  import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

  export let selectedLength, transactionsLength;
  let open = false, clickable = false;
  const setOpen = (isOpen) => {
    if(!isOpen) { setTimeout(() => open = isOpen, 200)}
    else { open = isOpen; }
    // so you can click closed but doesn't auto close on initial click
    setTimeout(() => clickable = isOpen, 100)
  }
  const toggleOpen = () => {
    if (clickable){
      open = !open;
    }
  }
  const multiselectButton = (e, option = "") => { 
    dispatch('multiselectButton', {
      option: option
    });
  }
  
</script>

<div class:is-active="{open}" class="dropdown">
  <div class="dropdown-trigger" on:mousedown={toggleOpen}>
    <button class="button background-transparent border-none" aria-haspopup="true" aria-controls="dropdown-menu2"
    on:focus={() => setOpen(true)} on:blur={() => setOpen(false)} tabindex="0">
      <span tabindex="0" on:click={multiselectButton}>
        {#if selectedLength == transactionsLength}
          <Fa icon={faCheckSquare} />
        {:else if selectedLength > 0}
          <Fa icon={faMinusSquare} />
        {:else}
          <Fa icon={faSquare} />
        {/if}
      </span>
      <span class="icon is-small">
        <Fa icon={faAngleDown}/>
      </span>
    </button>
  </div>
  <div class="dropdown-menu" id="dropdown-menu3" role="menu">
    <div class="dropdown-content">
      <button class="dropdown-item button-link" on:click={(e) => multiselectButton(e,'all')}>All</button>
      <button class="dropdown-item button-link" on:click={(e) => multiselectButton(e,'none')}>None</button>
      <button class="dropdown-item button-link" on:click={(e) => multiselectButton(e,'unread')}>Unread</button>
      <button class="dropdown-item button-link" on:click={(e) => multiselectButton(e,'read')}>Read</button>
    </div>
  </div>
</div>