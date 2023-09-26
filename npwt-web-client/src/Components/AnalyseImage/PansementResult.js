import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import woundCareData from './DataPansement.json';

    const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
    ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
    }));

    const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
    ))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
    }));

    const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    }));
    function AccordionComponenet({dataForMaxClass, color}) {
        const [expanded, setExpanded] = React.useState(null);
        const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
        }; 
        return (
        <div>
            {dataForMaxClass.map((item, index) => (
                <div key={index}>
                    <Accordion expanded={expanded === index} onChange={handleChange(index)}>
                        <AccordionSummary sx={{ backgroundColor:color }} aria-controls="indexd-content" id="indexd-header">
                            <Typography>{Object.keys(item)[0]}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                {item[Object.keys(item)[0]]}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
            ))}
        </div>
        );
    }
  
  export default function PansementResult({ maxClass }) {
    const dataForMaxClass = woundCareData[maxClass];
    if (maxClass === "Plaies Primaires") {
      return <AccordionComponenet dataForMaxClass={dataForMaxClass} color="lightGreen"/>;
    } else if (maxClass === "Plaies en Phase de Cicatrisation Moyenne") {
      return <AccordionComponenet dataForMaxClass={dataForMaxClass} color="#fffe7a"/>;
    } else if (maxClass === "Plaies Avancées") {
      return <AccordionComponenet dataForMaxClass={dataForMaxClass} color="lightsalmon"/>;
    } else {
      return <></>;
    }
  }
  