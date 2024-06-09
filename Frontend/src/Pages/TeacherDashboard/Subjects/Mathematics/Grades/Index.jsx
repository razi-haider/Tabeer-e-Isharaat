import StudentLiteracyGradesLine from '../../../../../Assets/StudentLiteracyGradesLine.png';
import { GradesTable } from './GradesTable';

export const MathematicsGradesContent = () => {

    return (
        <div className="MathematicsHomeContent">
            <div className="LiteracyGrades">
                {/* Table */}
                <GradesTable />

                {/* Line */}
                <img src={StudentLiteracyGradesLine} className='LiteracyGradeImageLine' />

                {/* Final Grade */}
                <div className="LiteracyGradeFinalGrade">
                    <span>OVERALL MEAN</span>
                    <span>80.5%</span>
                    <span>A+</span>
                </div>
            </div>
        </div>

    )

}