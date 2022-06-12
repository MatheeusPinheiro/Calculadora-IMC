
import { useState } from 'react';
import styles from './App.module.css';
import poweredImage from './Assets/powered.png';
import {levels, calculateImc, Level} from './helpers/imc';
import {GridItem} from './components/GridItem';
import leftArrow from './Assets/leftarrow.png';
const App = ()=>{
  const [heigthField, setHeigthField ] = useState<number>(0);

  const [weigthField, setWeigthField] = useState<number>(0)

  const [toShow, setToShow] = useState <Level | null> (null);

  const handleCalculateButton = ()=>{
    if(heigthField && weigthField){
      setToShow(calculateImc(heigthField, weigthField));
    }else{
      alert('Digite todos os campos');
    }
  }

  const handleBackButton = ()=>{
    setToShow(null);
    setHeigthField(0)
    setWeigthField(0)
  }

  return(
    <div className={styles.main}> 
      <header>
        <div className={styles.headerContainer}>
            <img src={poweredImage} alt="" width={150} />
        </div>
      </header>
      <div className={styles.container}>
          <div className={styles.leftSide}>
            <h1>Calcule seu IMC</h1>
            <p>IMC é a sigla para Índice de Massa Corporal</p>

            <input 
              type="number"
              placeholder='Digite a sua altura. Ex: 1.80 (em metros)'
              value={heigthField > 0 ? heigthField : ''}
              onChange={e => setHeigthField(parseFloat(e.target.value))}
              disabled={toShow ? true : false}
            />
             <input 
              type="number"
              placeholder='Digite o seu peso. Ex: 65 (em kg)'
              value={weigthField > 0 ? weigthField : ''}
              onChange={e => setWeigthField(parseFloat(e.target.value))}
              disabled={toShow ? true : false}
            />

            <button onClick={handleCalculateButton} disabled={toShow ? true : false}>Calcular</button>
          </div>
          <div className={styles.rigthSide}>
            {
              !toShow &&
              <div className={styles.grid}>
                {levels.map((item,key)=>(
                  <GridItem key={key} item={item} />
                ))}
            </div>
            }
            {toShow &&

              <div className={styles.rightBig}>
                <div className={styles.rightArrow} onClick={handleBackButton}>
                  <img src={leftArrow} alt=""   width={25}/>
                </div>
                <GridItem  item={toShow}/>
              </div>
            }
          </div>
      </div>
    </div> 
  );
}

export default App;