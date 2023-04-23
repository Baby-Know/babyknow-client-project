import { Box } from '@mui/material';
import babyfeet from './babyfeet.avif'
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
        <h1>Welcome to Baby Know</h1>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          width: '80%',
          height: '150%',
          fontSize: 20
        }}
      >
        <p>
          Our course is designed to support parents and caregivers throughout their child’s first year of life by providing
          easily accessible video lessons covering all aspects of child development in addition to strategies
          and activities to promote the overall well-being of the entire family.
        </p>
      </Box>

      <Box
        sx={{
          justifyContent: "center",
          alignItems: "center",
          maxWidth: '100%',
          height: 'auto',
        }}
      >
        <img style={{
        display: 'block', 
        marginLeft:'auto', 
        marginRight:'auto', 
        width: '40%', 
        border: '3px solid black'}} src={babyfeet}/>
      </Box>


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
          fontSize: 20
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

      <Box sx={{
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
        width: '80%',
        height: '150%',
        fontSize: 20
      }}>
        <h3>Units are organized by developmental period:</h3>
      </Box>


      <Box sx={{
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
        width: '80%',
        height: '150%',
        fontSize: 20
      }}>
        <ul>
          <li>Unit 1: 0-3 Months</li>
          <li>Unit 2: 4-6 Months</li>
          <li>Unit 3: 7-9 Months</li>
          <li>Unit 4: 10-12 Months</li>
        </ul>
      </Box>

      <Box sx={{
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
        width: '80%',
        height: '150%',
        fontSize: 20
      }}>
        <h3>The following topics are covered within each unit:</h3>
      </Box>

      <Box sx={{
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
        width: '80%',
        height: '150%',
        fontSize: 20,
      }}>
        <ul>
          <li>Fine Motor/Sensory</li>
          <li>Gross Motor</li>
          <li>Speech, Language and Play</li>
          <li>Vision</li>
          <li>Curriculum Based Learning/School Readiness</li>
          <li>General New Parent Advice</li>
        </ul>
      </Box>

      <Box sx={{
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        margin: "auto" }}>
        <h3>For any questions, please email babyknowprogram@gmail.com</h3>
      </Box>


    </div >
  );
}

export default AboutPage;
