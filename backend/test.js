const chai = require('chai');
const chaiHttp = require('chai-http');
const bcrypt = require('bcrypt');
const sinon = require('sinon');
const app = require('../backend/app.js'); 
const sinonChai = require('sinon-chai');
// const supertest = require('supertest');
// const sinonMongoose = require('sinon-mongoose');
// const emailValidator = require('email-validator');
const { signUpFunction } = require('../backend/controllers/signUpController');


const {addUser} = require('./controllers/Crud.js')
const { listUser } = require('./controllers/Crud.js');
const { deleteUser } = require('./controllers/Crud.js');
const { updateUser } = require('./controllers/Crud.js');
const { verifyUser } = require('./controllers/Crud.js');
const { unverifyUser } = require('./controllers/Crud.js');
const { search } = require('./controllers/Crud.js');
const UserModal = require('./models/User.js');

chai.use(chaiHttp);
chai.use(sinonChai);
const expect = chai.expect;

describe('addUser', () => {
    
    let bcryptStub;
    let userStub;
    const userData = {  
      codePostale: '2097',
      userName: 'John Doe',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: new Date('1990-01-01'),
      gender: 'male',
      phoneNumber: '12345678',
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    };
    
    beforeEach(() => {
      bcryptStub = sinon.stub(bcrypt, 'hash').resolves('hashedPassword');
      userStub = sinon.stub(User, 'create').resolves({ _id: 'user_id', ...userData });
    });
    
    afterEach(() => {
      bcryptStub.restore();
      userStub.restore();
    });
  
    it('should add a new user', async (done) => {
      const res = await chai.request(app)
        .post('/addUser') 
        .send(userData);
  
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('userName', userData.userName);
      
      
    });
    
});

describe('listUser', () => {
    afterEach(() => {
      sinon.restore(); 
    });
  
    it('should return a list of users', async () => {
      
      const findStub = sinon.stub(UserModal, 'find').resolves(['user1', 'user2']);
  
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };
  
      await listUser(req, res);
  
      expect(findStub.calledOnce).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith(['user1', 'user2'])).to.be.true;
    });
  
    it('should handle errors', async () => {
      
      const findStub = sinon.stub(UserModal, 'find').rejects(new Error('Database error'));
  
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };
  
      await listUser(req, res);
  
      expect(findStub.calledOnce).to.be.true;
      expect(res.status.calledWith(500)).to.be.true;
      expect(res.send.calledWith({ message: 'Internal Server Error' })).to.be.true;
    });
  });


  describe('deleteUser', () => {
    afterEach(() => {
      sinon.restore(); 
    });
  
    it('should delete a user and return success message', async () => {
      
      const findByIdAndDeleteStub = sinon.stub(UserModal, 'findByIdAndDelete').resolves({ _id: 'someUserId' });
  
      const req = { params: { id: 'someUserId' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };
  
      await deleteUser(req, res);
  
      expect(findByIdAndDeleteStub.calledOnceWithExactly('someUserId')).to.be.true;
      expect(res.json.calledWithExactly({ message: 'User deleted' })).to.be.true;
    });
  
    it('should handle user not found', async () => {

        const findByIdAndDeleteStub = sinon.stub(UserModal, 'findByIdAndDelete').resolves(null);
  
      const req = { params: { id: 'nonExistentUserId' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };
  
      await deleteUser(req, res);
  
      expect(findByIdAndDeleteStub.calledOnceWithExactly('nonExistentUserId')).to.be.true;
      expect(res.status.calledWithExactly(404)).to.be.true;
      expect(res.json.calledWithExactly({ message: 'User not found' })).to.be.true;
    });
  
    it('should handle errors', async () => {
      
      const findByIdAndDeleteStub = sinon.stub(UserModal, 'findByIdAndDelete').rejects(new Error('Database error'));
  
      const req = { params: { id: 'someUserId' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };
  
      await deleteUser(req, res);
  
      expect(findByIdAndDeleteStub.calledOnceWithExactly('someUserId')).to.be.true;
      expect(res.status.calledWithExactly(500)).to.be.true;
      expect(res.json.calledWithMatch({ message: 'Database error' })).to.be.true;
    });
  });


  describe('updateUser', () => {
    afterEach(() => {
      sinon.restore(); 
    });
  
    it('should update a user and return updated user', async () => {
        const genSaltStub = sinon.stub(bcrypt, 'genSalt').resolves('someSalt');
        const hashStub = sinon.stub(bcrypt, 'hash').resolves('hashedPassword');
      
        const updateOneStub = sinon.stub(UserModal, 'updateOne').resolves({ nModified: 1 });
      
        const req = {
          params: { id: 'someUserId' },
          body: { password: 'newPassword', otherField: 'newValue' }
        };
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.stub()
        };
      
        await updateUser(req, res);
      
        console.log('genSalt call count:', genSaltStub.callCount);
        console.log('hash call count:', hashStub.callCount);
        console.log('updateOne call count:', updateOneStub.callCount);
      
        expect(genSaltStub.calledOnceWithExactly(10)).to.be.true;
        expect(hashStub.calledOnceWithExactly('newPassword', 'someSalt')).to.be.true;
        expect(updateOneStub.calledOnceWithExactly({ _id: 'someUserId' }, { $set: { password: 'hashedPassword', otherField: 'newValue', verified: false } })).to.be.true;
        expect(res.status.calledWithExactly(200)).to.be.true;
        expect(res.json.calledOnceWithExactly({ nModified: 1 })).to.be.true;
      });
  
    it('should handle errors', async () => {
      
      const genSaltStub = sinon.stub(bcrypt, 'genSalt').resolves('someSalt');
      const hashStub = sinon.stub(bcrypt, 'hash').resolves('hashedPassword');
  
      
      const updateOneStub = sinon.stub(UserModal, 'updateOne').rejects(new Error('Database error'));
  
      const req = {
        params: { id: 'someUserId' },
        body: { password: 'newPassword', otherField: 'newValue' }
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };
  
      await updateUser(req, res);
  
      expect(genSaltStub.calledOnceWithExactly(10)).to.be.true;
      expect(hashStub.calledOnceWithExactly('newPassword', 'someSalt')).to.be.true;
      expect(updateOneStub.calledOnceWithExactly({ _id: 'someUserId' }, { $set: { password: 'hashedPassword', otherField: 'newValue', verified: false } })).to.be.true;
      expect(res.status.calledWithExactly(500)).to.be.true;
      expect(res.json.calledWithMatch({ message: 'Database error' })).to.be.true;
    });
  });

  describe('verifyUser', () => {
    afterEach(() => {
      sinon.restore(); 
    });
  
    it('should verify a user and return success message', async () => {
      
      const findByIdAndUpdateStub = sinon.stub(UserModal, 'findByIdAndUpdate').resolves();
  
      const req = { params: { userId: 'someUserId' } };
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };
  
      await verifyUser(req, res);
  
      expect(findByIdAndUpdateStub.calledOnceWithExactly('someUserId', { verified: true })).to.be.true;
      expect(res.status.calledWithExactly(200)).to.be.true;
      expect(res.send.calledWithExactly({ message: 'User verified successfully' })).to.be.true;
    });
  
    it('should handle errors', async () => {
      
      const findByIdAndUpdateStub = sinon.stub(UserModal, 'findByIdAndUpdate').rejects(new Error('Database error'));
  
      const req = { params: { userId: 'someUserId' } };
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };
  
      await verifyUser(req, res);
  
      expect(findByIdAndUpdateStub.calledOnceWithExactly('someUserId', { verified: true })).to.be.true;
      expect(res.status.calledWithExactly(500)).to.be.true;
      expect(res.send.calledWithExactly({ message: 'Internal Server Error' })).to.be.true;
    });
  });

  describe('unverifyUser', () => {
    afterEach(() => {
      sinon.restore(); 
    });
  
    it('should unverify a user and return success message', async () => {
        const findByIdAndUpdateStub = sinon.stub(UserModal, 'findByIdAndUpdate').resolves();
      
        const req = { params: { userId: 'someUserId' } };
        const res = {
          status: sinon.stub().returnsThis(),
          send: sinon.stub()
        };
      
        await unverifyUser(req, res);
      
        console.log('findByIdAndUpdate call count:', findByIdAndUpdateStub.callCount);
      
        expect(findByIdAndUpdateStub.calledOnce).to.be.true;
        expect(findByIdAndUpdateStub.calledWithExactly('someUserId', { verified: false })).to.be.true;
        expect(res.status.calledWithExactly(200)).to.be.true;
        expect(res.send.calledWithExactly({ message: 'User unverified successfully' })).to.be.true;
      });
  
    it('should handle errors', async () => {
      
      const findByIdAndUpdateStub = sinon.stub(UserModal, 'findByIdAndUpdate').rejects(new Error('Database error'));
  
      const req = { params: { userId: 'someUserId' } };
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };
  
      await unverifyUser(req, res);
  
      expect(findByIdAndUpdateStub.calledOnceWithExactly('someUserId', { verified: false })).to.be.true;
      expect(res.status.calledWithExactly(500)).to.be.true;
      expect(res.send.calledWithExactly({ message: 'Internal Server Error' })).to.be.true;
    });
  });

  describe('search', () => {
    afterEach(() => {
      sinon.restore(); 
    });
  
    it('should return matching users', async () => {
      
      const findStub = sinon.stub(UserModal, 'find').resolves([{ userName: 'hibadev', email: 'hiba@gmail.com' }]);
  
      const req = { params: { key: 'hibadev' } };
      const res = {
        send: sinon.stub()
      };
  
      await search(req, res);
  
      expect(findStub.calledOnceWithExactly({
        "$or": [
          { name: { $regex: 'hibadev' } },
          { email: { $regex: 'hibadev' } },
        ],
      })).to.be.true;
      expect(res.send.calledOnceWithExactly([{ userName: 'hibadev', email: 'hiba@gmail.com' }])).to.be.true;
    });
  
  




  describe('POST /login', () => {
    it('should log in a user ', (done) => {
      const userCredentials = {
        email: 'sdiriraed5@gmail.com',
        password: 'Aa123456*',
        
      
      };
  
      chai
        .request(app)
        .post('/login')
        .send(userCredentials)
        .end((err, res) => {
          expect(res).to.have.status(200);
          
          done();
        });
    }); // c bon
  
    it('should return an error if email is not registered', (done) => {
      const userCredentials = {
        email: 'non_existent_user@example.com',
        password: 'password123',
      };
  
      chai
        .request(app)
        .post('/login')
        .send(userCredentials)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.errors.email).to.equal('Cet email n'est pas enregistré');
          done();
        });
    });
  
    
  });
  
  // Test pour la fonction forget_password
  describe('POST /forget-password', () => {
    it('should send a reset password email if the provided email exists', (done) => {
      const emailData = {
        email: 'rihabcherni000@gmail.com', // Remplacez par un email existant dans votre base de données
      };
  
      chai
        .request(app)
        .post('/forget-password')
        .send(emailData)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.msg).to.equal('Please check your inbox of mail and reset your password.');
          done();
        });
    });
  
    
  
   
    
  
   
  });
  
});
  