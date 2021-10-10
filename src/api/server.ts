
let token = `f5cd70d40858c91655d968d5539bd83889244c8d0568c88f`

export const server_calls = {
    get: async () => {
        const response = await fetch(`https://drone-inventory-paris.herokuapp.com/api/cars`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token} `
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data from server')
        }

        return await response.json()
    },

    create: async (data: any = {}) => {
        const response = await fetch(`https://drone-inventory-paris.herokuapp.com/api/cars`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token} `
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to Create new data on server')
        }

        return await response.json()
    },
    update: async (id: string, data: any = {}) => {
        const response = await fetch(`https://drone-inventory-paris.herokuapp.com/api/cars/ ${id} `, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token} `
            },
            body: JSON.stringify(data)
        });
    },
    delete: async (id: string) => {
        const response = await fetch(`https://drone-inventory-paris.herokuapp.com/api/cars/ ${id} `, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token} `
            }
        })
    }
}
