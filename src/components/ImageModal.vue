<template>
    <q-card>
        <q-bar class="bg-primary text-white">
            <q-space />
            <q-btn dense flat icon="fal fa-times" v-close-popup />
        </q-bar>
        
        <q-card-section class="row items-center">
            <q-img :src="`${src}`" style="width: 600px" />
        </q-card-section>
    </q-card>
</template>

<script>
export default {
    name: 'ImageModal',

    props: ['src']
}
</script>

<style>

</style>