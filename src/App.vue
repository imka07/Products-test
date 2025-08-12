<template>
  <div id="app">
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-4xl font-bold text-gray-800 mb-8 text-center">
          Vue.js + Tailwind CSS
        </h1>
        
        <!-- Data Table -->
        <div class="mb-8 bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-2xl font-semibold text-gray-700 mb-4">Data Table</h2>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(person, index) in tableData" :key="index" 
                    class="hover:bg-gray-50 transition-colors duration-200">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                          {{ person.name.charAt(0) }}
                        </div>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ person.name }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ person.email }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ person.phone }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                          :class="person.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                      {{ person.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Chart -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-2xl font-semibold text-gray-700 mb-4">Chart</h2>
          <div class="h-96 flex items-end justify-center space-x-2">
            <div v-for="(data, index) in chartData" :key="index" class="flex flex-col items-center">
              <div class="text-xs text-gray-600 mb-2">{{ data.month }}</div>
              <div class="w-16 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg transition-all duration-300 hover:from-blue-600 hover:to-blue-400"
                   :style="{ height: data.value * 3 + 'px' }"
                   :title="`${data.month}: ${data.value}`">
              </div>
              <div class="text-xs text-gray-500 mt-1">{{ data.value }}</div>
            </div>
          </div>
        </div>

        <!-- Interactive Elements -->
        <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white rounded-lg shadow-lg p-6">
            <h3 class="text-lg font-semibold text-gray-700 mb-4">Add New Person</h3>
            <form @submit.prevent="addPerson" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Name</label>
                <input v-model="newPerson.name" type="text" required
                       class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Email</label>
                <input v-model="newPerson.email" type="email" required
                       class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Phone</label>
                <input v-model="newPerson.phone" type="tel" required
                       class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              </div>
              <button type="submit" 
                      class="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
                Add Person
              </button>
            </form>
          </div>

          <div class="bg-white rounded-lg shadow-lg p-6">
            <h3 class="text-lg font-semibold text-gray-700 mb-4">Statistics</h3>
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Total People:</span>
                <span class="text-2xl font-bold text-blue-600">{{ tableData.length }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Active:</span>
                <span class="text-lg font-semibold text-green-600">{{ activeCount }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Inactive:</span>
                <span class="text-lg font-semibold text-red-600">{{ inactiveCount }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'

export default {
  name: 'App',
  setup() {
    const tableData = ref([
      { name: 'John Doe', email: 'john@example.com', phone: '555-1234', status: 'Active' },
      { name: 'Jane Smith', email: 'jane@example.com', phone: '555-5678', status: 'Active' },
      { name: 'Bob Johnson', email: 'bob@example.com', phone: '555-9012', status: 'Inactive' },
      { name: 'Alice Brown', email: 'alice@example.com', phone: '555-3456', status: 'Active' },
      { name: 'Charlie Wilson', email: 'charlie@example.com', phone: '555-7890', status: 'Active' }
    ]);

    const chartData = ref([
      { month: 'Jan', value: 20 },
      { month: 'Feb', value: 25 },
      { month: 'Mar', value: 30 },
      { month: 'Apr', value: 35 },
      { month: 'May', value: 40 },
      { month: 'Jun', value: 45 }
    ]);

    const newPerson = ref({
      name: '',
      email: '',
      phone: '',
      status: 'Active'
    });

    const activeCount = computed(() => 
      tableData.value.filter(person => person.status === 'Active').length
    );

    const inactiveCount = computed(() => 
      tableData.value.filter(person => person.status === 'Inactive').length
    );

    const addPerson = () => {
      if (newPerson.value.name && newPerson.value.email && newPerson.value.phone) {
        tableData.value.push({
          name: newPerson.value.name,
          email: newPerson.value.email,
          phone: newPerson.value.phone,
          status: newPerson.value.status
        });
        
        // Reset form
        newPerson.value = {
          name: '',
          email: '',
          phone: '',
          status: 'Active'
        };
      }
    };

    onMounted(() => {
      console.log('Vue.js + Tailwind CSS приложение загружено!');
    });

    return {
      tableData,
      chartData,
      newPerson,
      activeCount,
      inactiveCount,
      addPerson
    }
  }
}
</script>

<style>
/* Дополнительные стили */
.hover\:bg-gray-50:hover {
  background-color: #f9fafb;
}

.transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>

