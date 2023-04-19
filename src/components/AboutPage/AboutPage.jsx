import { Box, Grid } from '@mui/material';

function AboutPage() {
  return (
    <div>
      <Box 
      sx={{
          display: 'flex',
          justifyContent: "center",
          alignItems: "center",
          margin: 'auto',
          width: '50%',
          height: '100%'
      }}
          >
        <h1>About Our Program</h1>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          width: '80%',
          height: '150%',
          fontSize: "150%"
        }}
      >
        <p>
          The first twelve months of a baby’s life are a crucial period for learning and brain development. It is often said that “Parents are a child’s first and most important teachers.” Yet, access to information, tools,
          and strategies for baby’s first year of life is not always readily available or utilized. New parents want the best for their child including all of the tools available,
          especially when they may not know how to promote or enhance their baby’s development.
          The BABY KNOW: BODIES, HEARTS & MINDS program provides new parents with a holistic approach to their child’s development.
          Our program includes information, tools, and strategies to create strong parent-child relationships, incorporating developmental milestones and nurturing the emotional well-being of all family members.
          Parents will learn through video lectures, demonstrations, and activities, covering all aspects of development.
        </p>

      </Box>
    </div>
  );
}

export default AboutPage;
