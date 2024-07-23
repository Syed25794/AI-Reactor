export const chemicalReactionDbModal = ({userId, chemicalReactions}) => {
    return {
        userId: userId,
        reactions: chemicalReactions,
        createdAt: new Date(),
    }
};
