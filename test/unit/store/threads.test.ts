import { expect } from 'chai';

import { getThreadStore } from '../../mock';
import { ThreadStore } from '../../../src/store/threads'

describe('Thread Store', function () {
  let threadStore: ThreadStore;
  before(() => {
    threadStore = getThreadStore()
  });

  it('should be able to get a thread by id', async function () {
    threadStore.getThread({ id: '100003961877411' }).then(thread => {
      expect(thread).to.exist;
      expect(thread.threadID).to.equal('100003961877411')
    })
  });

  it('should be able to get a thread by name', async function () {
    threadStore.getThread({ name: 'tom quirk' }).then(thread => {
      expect(thread).to.exist;
      expect(thread.threadID).to.equal('100003961877411')
    })
  });

  it('should be able to get a thread by fuzzy thread name', async function () {
    threadStore.getThread({ name: 'to' }).then(thread => {
      expect(thread).to.exist;
      expect(thread.threadID).to.equal('100003961877411')
    })
  });

  it('should be able to get a thread by id when query contains both name and id', async function () {
    threadStore.getThread({ id: '100003961877411', name: 'ahhaha' }).catch(thread => {
      expect(thread).to.exist;
      expect(thread.threadID).to.equal('100003961877411')
    })
  });

  it('should be able to get a thread by name when thread doesnt exist but friend does', async function () {
    threadStore.getThread({ name: 'test friend' }).then(thread => {
      expect(thread).to.exist;
      expect(thread.threadID).to.equal('12345')
    })
  });
});