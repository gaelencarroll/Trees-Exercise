function TreeNode(val){
    this.val = val;
    this.left = null;
    this.right = null;
}

function lowestCommonAncestor(root, p, q){
    if(root === null){
        return null
    }
    if(root === p || root === q){
        return root
      }
      const left = this.lowestCommonAncestor(root.left, p, q)
      const right = this.lowestCommonAncestor(root.right, p, q)
  
      if(left !== null && right !== null){
        return root
      }
      if(left !== null || right !== null){
        return left || right;
      }
      if(left === null || right === null){
        return null;
      }
}