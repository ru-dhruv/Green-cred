
import { Reward, NGO, Resource } from './types';

export const REWARDS: Reward[] = [
  { id: 1, name: 'Tree Planting Badge', description: 'A symbolic badge for planting your first tree.', cost: 50, icon: '🌳' },
  { id: 2, name: 'Eco Warrior Certificate', description: 'Official digital certificate of eco-heroism.', cost: 150, icon: '🛡️' },
  { id: 3, name: 'Local Cafe Discount', description: '10% off at any participating zero-waste cafe.', cost: 300, icon: '☕' },
  { id: 4, name: 'Ocean Cleaner Kit', description: 'Physical kit sent to your home for beach cleanups.', cost: 1000, icon: '🌊' },
];

export const NGOS: NGO[] = [
  { id: 1, name: 'WWF', description: 'World Wide Fund for Nature – global conservation.', link: 'https://www.worldwildlife.org/', icon: '🐼' },
  { id: 2, name: 'Arbor Day Foundation', description: 'The largest nonprofit membership organization dedicated to planting trees.', link: 'https://www.arborday.org/', icon: '🌲' },
  { id: 3, name: 'TreePeople', description: 'Inspiring people to plant and care for trees in urban areas.', link: 'https://www.treepeople.org/', icon: '🏙️' },
  { id: 4, name: 'Ocean Conservancy', description: 'Working to protect the ocean from today’s greatest global challenges.', link: 'https://oceanconservancy.org/', icon: '🐬' },
];

export const INITIAL_RESOURCES: Resource[] = [
  {
    id: '1',
    title: 'Beginner\'s Guide to Composting',
    category: 'Waste',
    content: 'Start your own compost pile at home with simple food scraps and yard waste.',
    link: 'https://www.epa.gov/recycle/composting-home',
    date: new Date().toISOString()
  },
  {
    id: '2',
    title: 'How to Plant a Tree',
    category: 'Gardening',
    content: 'Follow these 10 easy steps to ensure your sapling grows strong.',
    link: 'https://www.arborday.org/trees/planting/',
    date: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Reduce Plastic in 30 Days',
    category: 'Lifestyle',
    content: 'A daily challenge to eliminate single-use plastics from your life.',
    link: 'https://www.unep.org/resources/report/single-use-plastics-roadmap-sustainability',
    date: new Date().toISOString()
  }
];

export const ACTION_TYPES = [
  { value: 'Recycling', points: 10, icon: '♻️' },
  { value: 'Used Reusable Bag', points: 5, icon: '🛍️' },
  { value: 'Biked to Work', points: 20, icon: '🚲' },
  { value: 'Planted a Tree', points: 50, icon: '🌳' },
  { value: 'Saved Energy', points: 15, icon: '💡' },
];
