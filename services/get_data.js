
export const GetData = {
    toolShopInventory: {
        'Location A': {
          'Hammer': {
            stock: 10,
            value: 15.99,
            barcode: 'ABC123'
          },
          'Screwdriver': {
            stock: 20,
            value: 9.99,
            barcode: 'DEF456'
          },
          'Wrench': {
            stock: 5,
            value: 12.99,
            barcode: 'GHI789'
          }
        },
        'Location B': {
          'Hammer': {
            stock: 8,
            value: 14.99,
            barcode: 'JKL012'
          },
          'Pliers': {
            stock: 15,
            value: 7.99,
            barcode: 'MNO345'
          },
          'Saw': {
            stock: 3,
            value: 24.99,
            barcode: 'PQR678'
          }
        },
        'Location C': {
          'Screwdriver': {
            stock: 12,
            value: 10.99,
            barcode: 'STU901'
          },
          'Wrench': {
            stock: 6,
            value: 11.99,
            barcode: 'VWX234'
          },
          'Pliers': {
            stock: 10,
            value: 8.99,
            barcode: 'YZA567'
          }
        }
      },
      fetchInventory: function(){
        return this.toolShopInventory;
      }
}