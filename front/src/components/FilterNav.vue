<template>
    <nav class="filter-nav">
        <button
            @click="updateFilter('all')"
            :class="{ active: current === 'all' }"
        >
            ALL
        </button>
        <button
            @click="updateFilter('online')"
            :class="{ active: current === 'online' }"
        >
            En ligne
        </button>
        <button
            @click="updateFilter('offline')"
            :class="{ active: current === 'offline' }"
        >
            Hors ligne
        </button>
    </nav>
</template>

<script>
export default {
    props: ['current'],
    methods: {
        updateFilter(by) {
            this.$emit('filterChange', by);
        },
    },
};
</script>

<style>
.filter-nav button {
    background: none;
    border: none;
    color: #abd4dd;
    outline: none;
    font-size: 12px;
    text-transform: uppercase;
    margin-right: 10px;
    letter-spacing: 1px;
    font-weight: bold;
    cursor: pointer;
}
.filter-nav button.active {
    color: #02d2fe;
}
</style>
