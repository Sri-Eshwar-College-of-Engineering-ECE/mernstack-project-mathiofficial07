const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

console.log('MongoDB URI exists:', !!process.env.MONGODB_URI);

const testDb = async () => {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected successfully!');
    
    const UserSchema = new mongoose.Schema({}, { strict: false });
    const User = mongoose.model('User', UserSchema, 'users');
    
    const count = await User.countDocuments({});
    console.log('Total documents in users collection:', count);
    
    const doctorsCount = await User.countDocuments({ role: 'doctor' });
    console.log('Total doctors in users collection:', doctorsCount);
    
    const approvedDoctors = await User.countDocuments({ role: 'doctor', 'doctorProfile.isApproved': true });
    console.log('Approved doctors:', approvedDoctors);
    
    const docs = await User.find({ role: 'doctor' }).limit(3);
    console.log('Sample doctors:', docs.map(d => ({ name: d.get('name'), isApproved: d.get('doctorProfile.isApproved') })));
    
    process.exit(0);
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
};

testDb();
