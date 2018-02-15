import { expect } from 'chai';
import Node from '../lib/Node.js'

describe('NODE', () => {
  let node;

  beforeEach(() => {
    node = new Node('pizza')
  })

  it('should exist', () => {
    expect(node).to.exist
  })

  it('should track if this node is the end of a complete word', () => {
    expect(node.completeWord).to.equal(0)
  })

  it('should be able to store child nodes', () => {
    expect(node.children).to.deep.equal({});
  })
})
