import Node from './Node';

class Trie {
  constructor() {
    this.wordCount = 0;
    this.children = {};
  }

  addWordToTrie (node, word) {
    let firstLetter = word[0];

    if (!node.children[firstLetter]) {
      node.children[firstLetter] = new Node();
    }

    if (word.length > 1) {
      this.addWordToTrie(node.children[firstLetter], word.slice(1));
    }

    if (word.length === 1 && node.children[firstLetter].completeWord !== 1) {
      this.wordCount++;
      node.children[firstLetter].completeWord = 1;
    }
  }

  insert(word) {
    this.addWordToTrie(this, word);
  }

  suggest(prefix) {

    const suggestions = [];

    let currentNode = this.traverse(prefix);

    const addSuggestion = (node, prefix) => {
      if (node.completeWord) {
        if (node.popularity > 0) {
          suggestions.unshift(prefix);
        } else {
          suggestions.push(prefix);
        }
      }

      const childNodes = Object.keys(node.children);

      childNodes.forEach((child) => {
        const newPrefix = prefix + child;

        addSuggestion(node.children[child], newPrefix);
      });
    };

    if (currentNode) {
      addSuggestion(currentNode, prefix);  
    }
    
    return suggestions;
  }

  traverse(prefix) {
    let currentNode = this;

    let count = 0;

    let numberOfNodesTraversed = 0;

    while (count < prefix.length) {
      if (currentNode.children[prefix[count]]) {
        currentNode = currentNode.children[prefix[count]];
        numberOfNodesTraversed++;
      }
      count++;
    }
    if (numberOfNodesTraversed === prefix.length) {
      return currentNode;  
    } else {
      return null;
    } 
  }

  populate(array) {
    array.forEach( word => {
      this.insert(word);
    });
  }

  select(word) {
    let currentNode = this.traverse(word);

    if (currentNode) {
      currentNode.popularity++;  
    }
  }

  delete(word) {
    let currentNode = this.traverse(word);

    if (currentNode) {
      currentNode.completeWord = 0;  
    }
  }
}

module.exports = Trie;

