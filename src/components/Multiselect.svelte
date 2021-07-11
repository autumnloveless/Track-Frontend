<script>
  import Fa from 'svelte-fa'
  import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
  import { faSquare, faMinusSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons'
  import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

  export let selectedLength, transactionsLength;
  let open = false, clickable = false;
  const setOpen = (isOpen) => { 
    open = isOpen;
    // so you can click closed but doesn't auto close on initial click
    setTimeout(() => clickable = isOpen, 100)
  }
  const toggleOpen = () => {
    if (clickable){
      open = !open;
    }
  }
  const multiselectButton = (e) => { 
    e.stopPropagation;
    dispatch('multiselectButton');
  }
  
</script>

<div class:is-active="{open}" class="dropdown">
  <div class="dropdown-trigger" on:click={toggleOpen}>
    <button class="button border-none" aria-haspopup="true" aria-controls="dropdown-menu2"
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
      <button class="dropdown-item button-link">All</button>
      <button class="dropdown-item button-link">None</button>
      <button class="dropdown-item button-link">Unread</button>
      <button class="dropdown-item button-link">Read</button>
    </div>
  </div>
</div>