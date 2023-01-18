const Node = (data, leftChild, rightChild) => {
    return { data, leftChild, rightChild };
};

// Console log the tree structure format
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node.rightChild !== null) {
        prettyPrint(
            node.rightChild,
            `${prefix}${isLeft ? "│   " : "    "}`,
            false
        );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.leftChild !== null) {
        prettyPrint(
            node.leftChild,
            `${prefix}${isLeft ? "    " : "│   "}`,
            true
        );
    }
};

const Tree = (array) => {
    // Returns balanced binary tree
    const buildTree = (prepedArray, start, end) => {
        if (start > end) return null;
        const mid = parseInt((start + end) / 2);
        console.log(mid);
        const root = Node(prepedArray[mid]);
        console.log(root);
        root.leftChild = buildTree(prepedArray, start, mid - 1);
        root.rightChild = buildTree(prepedArray, mid + 1, end);
        prettyPrint(root);
        return root;
    };

    // Sort provided array and remove duplicates
    const sortedArray = array.sort((a, b) => a - b);
    const noDuplicates = [...new Set(sortedArray)];
    console.log(noDuplicates);
    let root = buildTree(noDuplicates, 0, noDuplicates.length - 1);

    // Returns node with the new value
    const insertValue = () => {};

    // Delete a node with the value
    const deleteValue = () => {};

    // Returns the node with the given value
    const findValue = () => {};

    // Traverse the tree in breadth-first level order
    const levelOrder = (fn) => {};

    // Traverse the tree depth-first inorder
    const inOrder = (fn) => {};

    // Traverse the tree depth-first preorder
    const preOrder = (fn) => {};

    // Traverse the tree depth-first postorder
    const postOrder = (fn) => {};

    // Returns height of the tree
    const height = () => {};

    // Returns depth of the tree
    const depth = () => {};

    // Check if the tree is balanced
    const isBalanced = () => {};

    // Run if the tree is unbalanced
    const rebalance = () => {};

    return {
        buildTree,
        insertValue,
        deleteValue,
        findValue,
        levelOrder,
        inOrder,
        preOrder,
        postOrder,
        height,
        depth,
        isBalanced,
        rebalance,
        prettyPrint,
    };
};

const gumTree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
