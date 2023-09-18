/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if(!this.root){
      return 0;
    }
    function minDepthHelper(node){
      if(node.left === null && node.right === null){
        return 1;
      }
      if(node.left === null){
        return minDepthHelper(node.right) + 1
      }
      if(node.right === null){
        return minDepthHelper(node.left) + 1
      }
      return (Math.min(minDepthHelper(node.left), minDepthHelper(node.right)) + 1)
    }
    return minDepthHelper(this.root)
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if(!this.root){
      return 0;
    }
    function maxDepthHelper(node){
      if(node.left === null && node.right === null){
        return 1;
      }
      if(node.left === null){
        return maxDepthHelper(node.right) + 1;
      }
      if(node.right === null){
        return maxDepthHelper(node.left) + 1;
      }
      return Math.max(maxDepthHelper(node.left), maxDepthHelper(node.right)) + 1
    }
    return maxDepthHelper(this.root)
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let res = 0;
    function maxSumHelper(node){
      if(node === null){
        return 0;
      }
      const leftSum = maxSumHelper(node.left)
      const rightSum = maxSumHelper(node.right)
      res = Math.max(result, leftSum + rightSum + node.val)
      return Math.max(0, node.val + leftSum, node.val + rightSum)
    }
    maxSumHelper(this.root);
    return res;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if(!this.root){
      return null
    }
    let queue = this.root;
    let next = null;

    while(queue.length){
      let current = queue.shift()
      let currentVal = current.val;
      let higher = currentVal > lowerBound
      let reassign = currentVal < next || next === null;

      if(higher && resassign){
        next = currentVal;
      }
      if(current.left){
        queue.push(current.left)
      }
      if(current.right){
        queue.push(current.right)
      }
    }
    return next;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    if(node1 === this.root || node2 === this.root){
      return false;
    }
    function areCousinsHelper(targetNode, currNode, level = 0, data = {level:0, parent: null}){
      if(data.parent){
        return data;
      }
      if(targetNode === currNode.left || targetNode === currNode.right){
        data.level = level + 1;
        data.parent = currNode;
      }
      if(currNode.left){
        areCousinsHelper(targetNode, currNode.left, level+1, data)
      }
      if(currNode.right){
        areCousinsHelper(targetNode, currNode.right, level+1, data)
      }
      return data;
    }
    
    let node1Data = areCousinsHelper(node1, this.root)
    let node2Data = areCousinsHelper(node2, this.root)

    let sameLevel = node1Data && node2Data && node1Data.level === node2Data.level;
    let diffParents = node1Data && node2Data && node2Data.parent !== node1Data.parent;
    return sameLevel && diffParents;
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    const vals = []
    function serializeHelper(node){
      if(node){
        vals.push(node.val)
        serializeHelper(node.left)
        serializeHelper(node.right)
      }
      else{
        vals.push('#')
      }
      serializeHelper(tree.root)
      return(vals.join(''))
    }

  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(stringTree) {
    const vals = stringTree.split(' ')
    function deserializeHelper(stringTree){
      if(vals.length){
        const currVal = vals.shift()
        if(currVal === '#'){
          return null;
        }
        let currNode = new BinaryTreeNode(+currVal)
        currNode.left = deserializeHelper()
        currNode.right = deserializeHelper()
        return currNode
      }
    }
    const root = deserializeHelper()
    return new BinaryTree(root)

  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2, currNode = this.root) {
    if(currNode === null){
      return null
    }
    if(node1 = currNode || node2 === currNode){
      return currNode
    }
    const left = this.lowestCommonAncestor(node1, node2, currNode.left)
    const right = this.lowestCommonAncestor(node1, node2, currNode.right)

    if(left !== null && right !== null){
      return currNode
    }
    if(left !== null || right !== null){
      return left || right;
    }
    if(left === null || right === null){
      return null;
    }
    
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
