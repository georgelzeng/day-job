var chai = require('chai')
  , chaiHttp = require('chai-http');
chai.use(chaiHttp);
const User = require('../config/models/user.model')
var expect = require('chai').expect;
var mongoose = require('mongoose')
var connect = require('../backend/mongoose').connect

const genPassword = require('../lib/passwordUtils').genPassword
const validPassword = require('../lib/passwordUtils').validPassword


before(function() {
    connect()
  });
  
after(function(done) {
    return mongoose.disconnect(done);
});

describe('testing presence in database', ()=>{
it('user should already exist', (done) => {
    User.findOne({username: 'george'})
        .then((user) => {
            expect(validPassword('123', user.hash, user.salt)).to.equal(true)
            done()
        })
        .catch((err) => {
            console.log('error', err)
            done(err)
        })
})
})

describe('password utils', () => {
    it('generating a password should have right hash', () => {
        saltHash = genPassword('password')
        salt = saltHash.salt
        hash = saltHash.hash
        expect(validPassword('password', hash, salt)).to.equal(true)
        done()
    })
})

// describe('testing authentication', ()=>{
//     it('creating a user should save that user in the db', () => {
//         console.log('here')
//         connect()
//         userCredentials = {username: 'bob', password: '123'}
//         chai.request('http://localhost:5000')
//             .post('/register')
//             .send(userCredentials)
//         User.findOne({username: 'bob'})
//             .then((user) => {
//                 console.log(user)
//                 expect(validPassword('123', user.hash, user.salt)).to.equal(true)
//                 User.deleteOne({ username: 'bob' }, function (err) {
//                     if(err) console.log(err);
//                     console.log("Successful deletion");
//                 })
//                 done()
//             })
//             .catch(err => {
//                 console.log('error', err)
//                 done(err)
//             })  
//     })
})


