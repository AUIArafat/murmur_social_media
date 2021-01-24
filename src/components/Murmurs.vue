<template>
            <v-col :cols="6" dense>
            <v-card elevation="2">
                <v-card-title class="headline">Murmurs</v-card-title>
                <v-row dense>
                    <v-col :cols="10">
                        <v-textarea
                        label="Post Murmur"
                        auto-grow
                        outlined
                        rows="2"
                        class="ma-6"
                        row-height="25"
                        shaped
                        ></v-textarea>
                    </v-col>
                    <v-col :cols="2">
                        <v-btn
                        x-large
                        class="ma-2"
                        outlined
                        color="indigo"
                        >
                    Post
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card>
            <v-card>
                <v-card-title class="headline">Murmur List</v-card-title>
            </v-card>
        </v-col>
</template>

<script>
export default {
    name:"Murmurs"
}
</script>