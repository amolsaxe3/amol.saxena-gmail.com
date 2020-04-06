const { expect } = require('chai')
import enzyme, { shallow } from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)
const initialState = {
  campuses: [],
}

import mockAxios from '../mock-axios'
import { setCampuses, fetchCampuses } from '../../app/redux/actions/campuses'

import rootReducer from '../../app/redux'
import { createStore } from 'redux'

const app = require('../../server')
const agent = require('supertest')(app)

const { db } = require('../../server/db')
const { Campus } = require('../../server/db')

const adapter = new Adapter()
enzyme.configure({ adapter })

import { AllCampuses } from '../../app/components/AllCampuses'

describe('Tier One: Campuses', () => {
  describe('<AllCampuses /> component', () => {
    it('renders the campuses passed in as props', () => {
      const wrapper = shallow(
        <AllCampuses
          onLoadCampuses = {() => {}}
          campuses={[
            {
              id: 1,
              name: 'Mars Academy',
              imageUrl: '/images/mars.png',
            },
            {
              id: 2,
              name: 'Jupiter Jumpstart',
              imageUrl: '/images/jupiter.jpeg',
            },
          ]}
        />
      )
      //console.log('wrapper here is: ', wrapper)
      expect(wrapper.text()).to.include('Mars Academy')
      expect(wrapper.text()).to.include('Jupiter Jumpstart')
      const images = wrapper.find('img').map(node => node.get(0).props.src)
      expect(images).to.include.members([
        '/images/mars.png',
        '/images/jupiter.jpeg',
      ])
    })

    it('*** renders "No Campuses" if passed an empty array of campuses', () => {
      const wrapper = shallow(
        <AllCampuses
          onLoadCampuses = {() => {}}
          campuses={[]}
        />
      )
      //console.log('wrapper here is: ', wrapper)
      expect(wrapper.text()).to.include('No Campuses');
    })
  })

  describe('Redux', () => {
    let fakeStore
    beforeEach(() => {
      fakeStore = mockStore(initialState)
    })

    describe('set campuses', () => {
      const campuses = [
        { id: 1, name: 'Mars Academy', imageUrl: '/images/mars.png' },
        { id: 2, name: 'Jupiter Jumpstart', imageUrl: '/images/jupiter.jpeg' },
      ]

      it('setCampuses action creator', () => {
        expect(setCampuses(campuses)).to.deep.equal({
          type: 'SET_CAMPUSES',
          campuses,
        })
      })

      it('fetchCampuses thunk creator', async () => {
        mockAxios.onGet('/api/campuses').replyOnce(200, campuses)
        await fakeStore.dispatch(fetchCampuses())
        const actions = fakeStore.getActions()
        //console.log('the actions here are: ', actions)
        expect(actions[0].type).to.equal('SET_CAMPUSES')
        expect(actions[0].campuses).to.deep.equal(campuses)
      })
    })

    describe('reducer', () => {
      let testStore
      beforeEach(() => {
        testStore = createStore(rootReducer)
      })

      it('returns the initial state by default', () => {
        const action = { type: 'TEST_DEFAULT' }
        const prevState = testStore.getState()
        testStore.dispatch(action)
        const newState = testStore.getState()
        //console.log('newState in reducer test: ', newState)
        expect(newState.campusState.campuses.length).to.equal(0);
      })

      it('reduces on SET_CAMPUSES action', () => {
        const campuses = [
          {
            id: 1,
            name: 'Mars Academy',
            imageUrl: '/images/mars.png',
          },
          {
            id: 2,
            name: 'Jupiter Jumpstart',
            imageUrl: '/images/jupiter.jpeg',
          },
        ]
        const action = { type: 'SET_CAMPUSES', campuses }

        const prevState = testStore.getState()
        testStore.dispatch(action)
        const newState = testStore.getState()

        expect(newState.campusState.campuses).to.be.deep.equal(campuses)
        expect(newState.campusState.campuses).to.not.be.equal(prevState.campuses)
      })
    })
  })

  describe('Express API', () => {
    // Let's test our Express routes WITHOUT actually using the database.
    // By replacing the findAll methods on the Campus and Student models
    // with a spy, we can ensure that our API tests won't fail just because
    // our Sequelize models haven't been implemented yet.
    const { findAll: campusFindAll } = Campus
    beforeEach(() => {
      Campus.findAll = sinon.spy(() => [
        { id: 1, name: 'Mars Academy', imageUrl: '/images/mars.png' },
        { id: 2, name: 'Jupiter Jumpstart', imageUrl: '/images/jupiter.jpeg' },
      ])
    })
    afterEach(() => {
      Campus.findAll = campusFindAll
    }) 

    it('GET /api/campuses responds with all campuses', async () => {
      const response = await agent.get('/api/campuses').expect(200)
      expect(response.body).to.deep.equal([
        { id: 1, name: 'Mars Academy', imageUrl: '/images/mars.png' },
        { id: 2, name: 'Jupiter Jumpstart', imageUrl: '/images/jupiter.jpeg' },
      ])
      expect(Campus.findAll.calledOnce).to.be.equal(true)
    })
  })

  describe('Sequelize Model', () => {
    before(() => db.sync({ force: true }))
    afterEach(() => db.sync({ force: true }))

    it('has fields name, address, imageUrl, description', () => {
      const campus = Campus.build({
        name: 'Jupiter Jumpstart',
        address: '5.2 AU',
        imageUrl: '/images/jupiter.png',
        description:
          'The best JavaScript Academy for toddlers in the solar system!',
      })
      expect(campus.name).to.equal('Jupiter Jumpstart')
      expect(campus.address).to.equal('5.2 AU')
      expect(campus.imageUrl).to.equal('/images/jupiter.png')
      expect(campus.description).to.equal(
        'The best JavaScript Academy for toddlers in the solar system!'
      )
    })

    it('*** requires name and address', async () => {
      const campus = Campus.build({ })
      try {
        await campus.validate()
        throw Error('validation should have failed with no name and address')
      } catch (err) {
        expect(err.message).to.contain('Please provide a value for "Name"')
        expect(err.message).to.contain('Please provide a value for "address"')
      }
    })

    it('name and address cannot be empty', async () => {
      const campus = Campus.build({ name: '', address: '' })
      try {
        await campus.validate()
        throw Error('validation should have failed with empty name and address')
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on name')
        expect(err.message).to.contain('Validation notEmpty on address')
      }
    })

    it('default imageUrl if left blank', async () => {
      const campus = Campus.build({
        name: 'Jupiter Jumpstart',
        address: '5.2 AU',
      })
      await campus.validate()
      expect(campus.imageUrl).to.be.a('string')
      expect(campus.imageUrl.length).to.be.greaterThan(1)
    })
  })
})
