<template>
    <div class="card">
        <img :src="image" alt="Article Image" class="card-image" />
        <div class="card-content">
            <h2 class="card-title">{{ title }}</h2>
            <p class="card-description">{{ description }}</p>
        </div>
    </div>
</template>

<script setup>
defineProps({
    image: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    }
});
</script>

<style scoped>
.card {
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin: 5px;
    display: flex;
    flex-direction: row;
    max-height: auto;
}
.card:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    border: 1px solid #000000;
    z-index: 1;
}

.card-image {
    width: 30%;
    height: auto;
    z-index: 0;
    border-radius: 8px;
    object-fit: contain;
    object-position: center;
}

.card-content {
    padding: 16px;
}

.card-title {
    margin: 0 0 8px;
    font-size: 1.25em;
}

.card-description {
    margin: 0;
    font-size: 0.9em;
    color: #555;
}

</style>