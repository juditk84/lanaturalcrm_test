<script setup>
    import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
    import CardBox from '@/components/CardBox.vue';
    import { computed, ref, onMounted } from 'vue'
    import { useProjectesStore } from '@/stores/projectesStore'

    const projectesStore = useProjectesStore();

    onMounted( async () => await projectesStore.fetchProjects())

    const tasksToBars = computed({})

    function generateBars(tasks){
        const tasksToBars = tasks.map(task => {
            return {
                myBeginDate: "2024-01-01 13:00",
                myEndDate: "2024-02-01 19:00",
                ganttBarConfig: {
                    hasHandles: true,
                // each bar must have a nested ganttBarConfig object ...
                id: task.id, // ... and a unique "id" property
                label: "Lorem ipsum dolor"
                }
            }
        })
        // return tasksToBars.value
    }

const timeunitContent = {label: "string", value: "vale"}
</script>

<template>
<LayoutAuthenticated>
    <CardBox>
        <g-gantt-chart
            chart-start="2024-01-01 12:00"
            chart-end="2024-12-31 12:00"
            color-scheme="default"
            precision="day"
            bar-start="myBeginDate"
            bar-end="myEndDate"
            width="1500%"
            row-height="75"
            class="overflow-auto"
            
        >

            <g-gantt-row v-for="project in projectesStore.allProjects?.ganttBars"
                         :id="project.id" 
                         :label="project.name" 
                         :bars="project.tasks" 
                         />
           
        </g-gantt-chart>
    </CardBox>

</LayoutAuthenticated>
</template>