const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true,
    // },
    month: {
        type: String,
        enum: ['Jan-2024', 'Feb-2024', 'Mar-2024', 'Apr-2024', 'May-2024', 'Jun-2024', 'Jul-2024', 'Aug-2024', 'Sep-2024', 'Oct-2024', 'Nov-2024', 'Dec-2024', 'Jan-2025', 'Feb-2025', 'Mar-2025', 'Apr-2025', 'May-2025', 'Jun-2025', 'Jul-2025', 'Aug-2025', 'Sep-2025', 'Oct-2025', 'Nov-2025', 'Dec-2025', 'Jan-2026', 'Feb-2026', 'Mar-2026', 'Apr-2026', 'May-2026', 'Jun-2026', 'Jul-2026', 'Aug-2026', 'Sep-2026', 'Oct-2026', 'Nov-2026', 'Dec-2026', 'Jan-2027', 'Feb-2027', 'Mar-2027', 'Apr-2027', 'May-2027', 'Jun-2027', 'Jul-2027', 'Aug-2027', 'Sep-2027', 'Oct-2027', 'Nov-2027', 'Dec-2027', 'Jan-2028', 'Feb-2028', 'Mar-2028', 'Apr-2028', 'May-2028', 'Jun-2028', 'Jul-2028', 'Aug-2028', 'Sep-2028', 'Oct-2028', 'Nov-2028', 'Dec-2028'],
        required: true,
    },
    overallMaintenance: {
        type: Number,
        
    },
    totalExpenseAmount: {
        type: Number,
        
    },
    securitySalary: {
        type: Number,
        
    },
    securityAdvance: {
        type: Number,
       
    },
    commonEB: {
        type: Number,
        
    },
    cleaningAccessories: {
        type: Number,
       
    },
    garbageMan: {
        type: Number,
        
    },
    dieselGenset: {
        type: Number,
        
    },
    cctvRecharge: {
        type: Number,
        
    },
    comments: {
        type: String,
        
    },
    createdDate: {
        type: Date,
        default: Date.now,
    }
    
    // ,
    // category: {
    //     type: String,
    //     enum: ['Groceries', 'Leisure', 'Electronics', 'Utilities', 'Clothing', 'Health', 'Others'],
    //     required: true,
    // },
});

const Expense = mongoose.model('Expense', ExpenseSchema);

module.exports = Expense;
